import { adminDb } from '$lib/server/firebaseAdmin';
import { generatePersonalQuestion } from '$lib/game/questionGenerator';
import type { PageServerLoad } from './$types';
import { fail, redirect, isRedirect, type Actions } from '@sveltejs/kit';
import { processRoundScores } from '$lib/server/scoring';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const gameCode = params.gameCode.toUpperCase();
	const playerName = cookies.get('playerName');

	if (!playerName) {
		throw redirect(303, `/?error=Session expired. Please join again.&gameCode=${gameCode}`);
	}

	try {
		if (!adminDb) {
			return {
				question: 'Database not initialized',
				error: 'Server configuration error (Admin SDK).',
				gameCode,
				playerName
			};
		}
		const gameRef = adminDb.ref(`gamecode/${gameCode}`);
		const snapshot = await gameRef.get();

		if (!snapshot.exists()) {
			throw redirect(303, '/?error=Game not found.');
		}

		const game = snapshot.val();
		const status = game.status || 'waiting';

		// Ensure player is in game
		if (!game.players || !game.players[playerName]) {
			await gameRef.child('players').update({ [playerName]: true });
		}

		// Handle question generation if not present and we are playing
		if (status === 'playing' && !game.questions) {
			const playersList = Object.keys(game.players || { [playerName]: true });
			const answerer = playersList[Math.floor(Math.random() * playersList.length)];
			const usedQuestions = game.usedQuestions || [];
			const questionData = await generatePersonalQuestion(answerer, usedQuestions);

			await gameRef.update({
				questions: questionData.question,
				currentAnswerer: { name: answerer },
				roundStatus: 'waiting',
				usedQuestions: [...usedQuestions, questionData.question],
				[`questionCounts/${answerer}`]: 1
			});

			return {
				question: questionData.question,
				answerer: answerer,
				gameCode,
				playerName,
				gameStatus: status,
				host: game.host,
				gameMode: game.gameMode
			};
		}

		return {
			question: game.questions || null,
			answerer: game.currentAnswerer?.name || null,
			gameCode,
			playerName,
			gameStatus: status,
			host: game.host,
			gameMode: game.gameMode || null
		};
	} catch (error) {
		if (isRedirect(error)) throw error;
		console.error('Critical error in play load function:', error);
		return {
			question: 'Could not load the question',
			error: 'Something went wrong. Please try again.',
			gameCode,
			playerName,
			gameStatus: 'error'
		};
	}
};

export const actions: Actions = {
	startGame: async ({ params, cookies, request }) => {
		const gameCode = params.gameCode?.toUpperCase();
		const playerName = cookies.get('playerName');
		const data = await request.formData();
		const gameMode = data.get('gameMode')?.toString() || 'unlimited';

		if (!gameCode || !playerName) return fail(400, { error: 'Missing session' });

		try {
			if (!adminDb) return fail(500, { error: 'Database not initialized' });
			const gameRef = adminDb.ref(`gamecode/${gameCode}`);
			const snapshot = await gameRef.get();
			const game = snapshot.val();

			if (!game) return fail(404, { error: 'Game not found' });
			if (game.host !== playerName) return fail(403, { error: 'Only the host can start the game' });

			await gameRef.update({
				status: 'playing',
				gameMode,
				questionCounts: {} // Initialize counts
			});

			return { success: true };
		} catch (error) {
			console.error('Error starting game:', error);
			return fail(500, { error: 'Failed to start game' });
		}
	},
	submitAnswer: async ({ request, cookies, params }) => {
		const gameCode = params.gameCode?.toUpperCase();
		const playerName = cookies.get('playerName');
		const data = await request.formData();
		const answer = data.get('answer')?.toString();

		if (!gameCode || !playerName || !answer) {
			return fail(400, { error: 'Game Code, Player Name, and Answer are required' });
		}

		try {
			if (!adminDb) return fail(500, { error: 'Database not initialized' });
			const gameRef = adminDb.ref(`gamecode/${gameCode}`);
			const snapshot = await gameRef.get();
			const game = snapshot.val();

			if (!game) return fail(404, { error: 'Game not found' });

			const answeredPlayersRef = gameRef.child('answeredPlayers');
			const answeredSnapshot = await answeredPlayersRef.get();
			const answeredPlayers = answeredSnapshot.val() || {};

			if (answeredPlayers[playerName]) {
				return fail(400, { error: 'You already answered this round!' });
			}

			// If they are the answerer, set the correct answer
			if (game.currentAnswerer?.name === playerName) {
				await gameRef.update({ correctAnswer: answer });
			} else {
				// If they are a guesser, store their guess
				await gameRef.child('guesses').update({ [playerName]: answer });
			}

			// Add to answered players
			await answeredPlayersRef.update({ [playerName]: true });

			// Check if everyone has answered
			const playersSnapshot = await gameRef.child('players').get();
			const players = Object.keys(playersSnapshot.val() || {});
			const updatedAnsweredSnapshot = await answeredPlayersRef.get();
			const updatedAnswered = Object.keys(updatedAnsweredSnapshot.val() || {});

			if (updatedAnswered.length === players.length) {
				await gameRef.update({ roundStatus: 'complete' });
				await processRoundScores(gameCode);
			} else {
				await gameRef.update({ roundStatus: 'inProgress' });
			}

			return { success: true, message: 'Answer submitted!' };
		} catch (error) {
			console.error('Error submitting answer:', error);
			return fail(500, { error: 'Failed to submit answer' });
		}
	},
	nextRound: async ({ params }) => {
		const gameCode = params.gameCode?.toUpperCase();
		if (!gameCode) return fail(400, { error: 'Game Code is required' });

		try {
			if (!adminDb) return fail(500, { error: 'Database not initialized' });
			const gameRef = adminDb.ref(`gamecode/${gameCode}`);

			const snapshot = await gameRef.get();
			const game = snapshot.val();

			if (!game) return fail(404, { error: 'Game not found' });

			const players = Object.keys(game.players || {});

			// Competitive mode check
			if (game.gameMode === 'competitive') {
				const counts = game.questionCounts || {};
				const finishedPlayers = players.filter((p) => (counts[p] || 0) >= 4);

				if (finishedPlayers.length === players.length) {
					await gameRef.update({ status: 'finished' });
					return { success: true };
				}

				// Pick someone who hasn't reached 4 yet
				const availablePlayers = players.filter((p) => (counts[p] || 0) < 4);
				const nextAnswerer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
				const usedQuestions = game.usedQuestions || [];
				const questionData = await generatePersonalQuestion(nextAnswerer, usedQuestions);

				await gameRef.update({
					questions: questionData.question,
					currentAnswerer: { name: nextAnswerer },
					correctAnswer: null,
					answeredPlayers: {},
					guesses: {},
					roundStatus: 'waiting',
					usedQuestions: [...usedQuestions, questionData.question],
					[`questionCounts/${nextAnswerer}`]: (counts[nextAnswerer] || 0) + 1
				});
			} else {
				// Unlimited mode
				const nextAnswerer = players[Math.floor(Math.random() * players.length)];
				const usedQuestions = game.usedQuestions || [];
				const questionData = await generatePersonalQuestion(nextAnswerer, usedQuestions);

				await gameRef.update({
					questions: questionData.question,
					currentAnswerer: { name: nextAnswerer },
					correctAnswer: null,
					answeredPlayers: {},
					guesses: {},
					roundStatus: 'waiting',
					usedQuestions: [...usedQuestions, questionData.question]
				});
			}

			return { success: true };
		} catch (error) {
			console.error('Error starting next round:', error);
			return fail(500, { error: 'Failed to start next round' });
		}
	},
	endGame: async ({ params, cookies }) => {
		const gameCode = params.gameCode?.toUpperCase();
		if (!gameCode) return fail(400, { error: 'Game Code is required' });

		try {
			if (!adminDb) return fail(500, { error: 'Database not initialized' });
			const gameRef = adminDb.ref(`gamecode/${gameCode}`);
			await gameRef.remove();

			cookies.delete('gameCode', { path: '/' });

			throw redirect(303, '/');
		} catch (error) {
			if (isRedirect(error)) throw error;
			console.error('Error ending game:', error);
			return fail(500, { error: 'Failed to end game' });
		}
	}
};
