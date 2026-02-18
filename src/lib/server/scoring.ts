import { adminDb } from './firebaseAdmin';
import { calculateKnowledgeScore } from '../../game/scoreCalculator';

export async function processRoundScores(gameCode: string) {
    if (!adminDb) {
        console.error('Cannot process scores: adminDb is null');
        return;
    }
    try {
        const gameRef = adminDb.ref(`gamecode/${gameCode}`);
        const snapshot = await gameRef.get();
        const game = snapshot.val();

        if (!game || !game.correctAnswer || !game.guesses) {
            console.warn('Cannot process scores: missing data', { gameCode });
            return;
        }

        const question = game.questions;
        const answerer = game.currentAnswerer.name;
        const correctAnswer = game.correctAnswer;
        const guesses = game.guesses;

        const scoresRef = gameRef.child('scores');
        const scoresSnapshot = await scoresRef.get();
        const currentScores = scoresSnapshot.val() || {};

        for (const [guesser, guess] of Object.entries(guesses)) {
            if (guesser === answerer) continue;

            const isCorrect = await calculateKnowledgeScore(question, guess as string, correctAnswer);

            // Initialize scores structure if needed
            if (!currentScores[guesser]) currentScores[guesser] = {};
            if (!currentScores[guesser][answerer]) {
                currentScores[guesser][answerer] = {
                    totalGuesses: 0,
                    correctGuesses: 0,
                    accuracyPercentage: 0
                };
            }

            const stats = currentScores[guesser][answerer];
            stats.totalGuesses += 1;
            if (isCorrect === 1) {
                stats.correctGuesses += 1;
            }
            stats.accuracyPercentage = Math.round((stats.correctGuesses / stats.totalGuesses) * 100);
        }

        await scoresRef.set(currentScores);
    } catch (error) {
        console.error('Error processing round scores:', error);
    }
}
