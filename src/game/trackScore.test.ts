import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackScores } from './trackScore';
import * as firebase from '../firebase/firebase';
import * as scoreCalculator from './scoreCalculator';
import { getDatabase, ref, get, set, update } from 'firebase/database';

// Mock firebase/database
vi.mock('firebase/database', () => ({
	getDatabase: vi.fn(),
	ref: vi.fn(),
	set: vi.fn(),
	get: vi.fn(),
	update: vi.fn(),
	child: vi.fn()
}));

// Mock firebase/app
vi.mock('firebase/app', () => ({
	initializeApp: vi.fn()
}));

// Mock internal firebase module
vi.mock('../firebase/firebase', () => ({
	db: {},
	addAnsweredPlayer: vi.fn()
}));

// Mock score calculator
vi.mock('./scoreCalculator', () => ({
	calculateKnowledgeScore: vi.fn()
}));

describe('trackScores', () => {
	const gameCode = 'testGame';
	const answerer = 'Alice';
	const guesser = 'Bob';
	const question = 'What is Alice favorite color?';

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should save answer if guesser is answerer', async () => {
		await trackScores(question, answerer, answerer, 'Blue', gameCode);

		expect(set).toHaveBeenCalled();
		// Verify it returns the correct message
		const result = await trackScores(question, answerer, answerer, 'Blue', gameCode);
		expect(result).toBe('Thank you for answering!');
	});

	it('should return waiting message if correct answer not set', async () => {
		(get as any).mockResolvedValue({
			exists: () => false
		});

		const result = await trackScores(question, answerer, guesser, 'Red', gameCode);
		expect(result).toBe(`waiting for ${answerer} to answer`);
	});

	it('should calculate score and update if answer exists', async () => {
		// Mock correct answer exists
		(get as any).mockImplementation((refObj: any) => {
			// This is a bit hacky as we don't know exactly what refObj is without inspecting calls
			// But we know the flow: check correctAnswer, then check score
			return Promise.resolve({
				exists: () => true,
				val: () => 'Blue' // Correct answer or scores object
			});
		});

		// Mock score calculation to be correct
		(scoreCalculator.calculateKnowledgeScore as any).mockResolvedValue(1);

		const result = await trackScores(question, answerer, guesser, 'Blue', gameCode);

		expect(scoreCalculator.calculateKnowledgeScore).toHaveBeenCalledWith(question, 'Blue', 'Blue');
		expect(update).toHaveBeenCalled();
		expect(result).toContain('Nice work');
	});
});
