import { adminDb } from '$lib/server/firebaseAdmin';
import { generatePersonalQuestion } from '../../../game/questionGenerator';
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

		// Ensure player is in game
		if (!game.players || !game.players[playerName]) {
			await gameRef.child('players').update({ [playerName]: true });
		}

		// Handle question generation if not present
		if (!game.questions) {
			const playersList = Object.keys(game.players || { [playerName]: true });
			const answerer = playersList[Math.floor(Math.random() * playersList.length)];
			const questionData = await generatePersonalQuestion(answerer);

			await gameRef.update({
				questions: questionData.question,
				currentAnswerer: { name: answerer },
				roundStatus: 'waiting'
			});

			return {
				question: questionData.question,
				answerer: answerer,
				gameCode,
				playerName
			};
		}

		return {
			question: game.questions,
			answerer: game.currentAnswerer?.name || 'Unknown',
			gameCode,
			playerName
		};
	} catch (error) {
		if (isRedirect(error)) throw error;
		console.error('Critical error in play load function:', error);
		return {
			question: 'Could not load the question',
			error: 'Something went wrong. Please try again.',
			gameCode,
			playerName
		};
	}
};

export const actions: Actions = {
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
				// Round complete logic will be handled by a "Next Round" action 
				// to avoid race conditions and let everyone see the results
				await gameRef.update({ roundStatus: 'complete' });
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

			// Calculate scores before clearing round data
			await processRoundScores(gameCode);

			const snapshot = await gameRef.get();
			const game = snapshot.val();

			if (!game) return fail(404, { error: 'Game not found' });

			const players = Object.keys(game.players || {});
			const nextAnswerer = players[Math.floor(Math.random() * players.length)];
			const questionData = await generatePersonalQuestion(nextAnswerer);

			await gameRef.update({
				questions: questionData.question,
				currentAnswerer: { name: nextAnswerer },
				correctAnswer: null,
				answeredPlayers: {},
				guesses: {},
				roundStatus: 'waiting'
			});

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
