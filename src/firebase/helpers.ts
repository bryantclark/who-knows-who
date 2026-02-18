import { db } from './firebase';
import { ref, set } from 'firebase/database';

export const addAnsweredPlayer = async (gameCode: string, playerName: string) => {
    const answeredRef = ref(db, `gamecode/${gameCode}/answeredPlayers/${playerName}`);
    await set(answeredRef, true);
};

export const submitAnswer = async (
    gameCode: string,
    playerName: string,
    answer: string,
    currentQuestion: string,
    currentAnswerer: string
) => {
    // This is a wrapper around trackScores that could reside here for cleaner routes
};
