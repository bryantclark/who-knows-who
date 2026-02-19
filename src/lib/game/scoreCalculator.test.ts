import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateBatchScores } from './scoreCalculator';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the Google Generative AI SDK
vi.mock('@google/generative-ai', () => {
    const GoogleGenerativeAI = vi.fn();
    GoogleGenerativeAI.prototype.getGenerativeModel = vi.fn().mockReturnValue({
        generateContent: vi.fn().mockResolvedValue({
            response: {
                text: () =>
                    JSON.stringify({
                        user2: 1,
                        user3: 0
                    })
            }
        })
    });
    return { GoogleGenerativeAI };
});

// Mock environment variable
vi.mock('$env/static/private', () => ({
    GEMINI_API_KEY: 'mock-api-key',
    MINSTRAL_API_KEY: ''
}));

describe('calculateBatchScores', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should correctly identify exact matches locally without calling AI', async () => {
        const question = 'Favorite Color?';
        const correctAnswer = 'Blue';
        const guesses = {
            user1: 'Blue', // Exact match
            user2: 'blue ' // Case/trim match
        };

        const scores = await calculateBatchScores(question, correctAnswer, guesses);

        expect(scores['user1']).toBe(1);
        expect(scores['user2']).toBe(1);

        // Should NOT have called AI because all were resolved locally
        expect(GoogleGenerativeAI).not.toHaveBeenCalled();
    });

    it('should use Levenshtein distance for close matches locally', async () => {
        const question = 'Favorite Fruit?';
        const correctAnswer = 'Apple';
        const guesses = {
            user1: 'Applez', // 1 edit distance
            user2: 'Aple' // 1 edit distance
        };

        const scores = await calculateBatchScores(question, correctAnswer, guesses);

        expect(scores['user1']).toBe(1);
        expect(scores['user2']).toBe(1);

        expect(GoogleGenerativeAI).not.toHaveBeenCalled();
    });

    it('should batch remaining guesses to AI', async () => {
        const question = 'Favorite Animal?';
        const correctAnswer = 'Dog';
        const guesses = {
            user1: 'Dog', // Local match
            user2: 'Puppy', // Semantic match (needs AI)
            user3: 'Cat' // Wrong (needs AI)
        };

        const scores = await calculateBatchScores(question, correctAnswer, guesses);

        expect(scores['user1']).toBe(1); // Local
        expect(scores['user2']).toBe(1); // AI returned 1
        expect(scores['user3']).toBe(0); // AI returned 0

        expect(GoogleGenerativeAI).toHaveBeenCalledTimes(1);
    });

    it('should handle empty guesses gracefully', async () => {
        const scores = await calculateBatchScores('Q', 'A', {});
        expect(scores).toEqual({});
    });
});
