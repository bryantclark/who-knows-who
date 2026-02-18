import { fail, redirect, isRedirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { adminDb } from '$lib/server/firebaseAdmin';

function generateGameCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous characters
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export const actions: Actions = {
    createGame: async ({ request, cookies }) => {
        const data = await request.formData();
        const playerName = data.get('playerName')?.toString();

        if (!playerName) {
            return fail(400, { error: 'Player Name is required' });
        }

        const gameCode = generateGameCode();

        try {
            if (!adminDb) {
                return fail(500, { error: 'Database not initialized. Please check server logs.' });
            }

            const gameRef = adminDb.ref(`gamecode/${gameCode}`);
            await gameRef.set({
                players: {
                    [playerName]: true
                },
                createdAt: Date.now(),
                status: 'waiting'
            });

            cookies.set('gameCode', gameCode, { path: '/', sameSite: 'strict', maxAge: 60 * 60 * 24 });
            cookies.set('playerName', playerName, { path: '/', sameSite: 'strict', maxAge: 60 * 60 * 24 });

            throw redirect(303, `/play/${gameCode}`);
        } catch (error) {
            if (isRedirect(error)) throw error;
            console.error('Error creating game:', error);
            return fail(500, { error: 'Failed to create game. Please try again.' });
        }
    },
    joinGame: async ({ request, cookies }) => {
        const data = await request.formData();
        const gameCode = data.get('gameCode')?.toString()?.toUpperCase();
        const playerName = data.get('playerName')?.toString();

        if (!gameCode || !playerName) {
            return fail(400, { error: 'Game Code and Player Name are required' });
        }

        try {
            if (!adminDb) {
                return fail(500, { error: 'Database not initialized. Please check server logs.' });
            }

            const gameRef = adminDb.ref(`gamecode/${gameCode}`);
            const snapshot = await gameRef.get();

            if (!snapshot.exists()) {
                return fail(404, { error: 'Game not found. Please check the code.' });
            }

            // Add player to the game
            await gameRef.child('players').update({
                [playerName]: true
            });

            cookies.set('gameCode', gameCode, { path: '/', sameSite: 'strict', maxAge: 60 * 60 * 24 });
            cookies.set('playerName', playerName, { path: '/', sameSite: 'strict', maxAge: 60 * 60 * 24 });

            throw redirect(303, `/play/${gameCode}`);
        } catch (error) {
            if (isRedirect(error)) throw error;
            console.error('Error joining game:', error);
            return fail(500, { error: 'Failed to join game. Please try again.' });
        }
    }
};
