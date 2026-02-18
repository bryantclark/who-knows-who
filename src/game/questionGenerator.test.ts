import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generatePersonalQuestion } from './questionGenerator';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the GoogleGenerativeAI class
const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn();

// Mock the module
vi.mock('@google/generative-ai', () => {
	// Return a mock class
	return {
		GoogleGenerativeAI: vi.fn()
	};
});

describe('generatePersonalQuestion', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		// When invoked with `new`, return an object with getGenerativeModel
		// We cast to any to avoid TS errors with mocking internals
		(GoogleGenerativeAI as unknown as any).mockImplementation(function () {
			return {
				getGenerativeModel: mockGetGenerativeModel
			};
		});

		mockGetGenerativeModel.mockReturnValue({
			generateContent: mockGenerateContent
		});

		vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key');
	});

	it('should return a parsed JSON question when API succeeds', async () => {
		const mockResponseText = JSON.stringify({
			question: "What is Bob's favorite movie?",
			type: 'preference'
		});

		mockGenerateContent.mockResolvedValue({
			response: {
				text: () => mockResponseText
			}
		});

		const result = await generatePersonalQuestion('Bob');

		expect(result).toEqual({
			question: "What is Bob's favorite movie?",
			type: 'preference'
		});
		expect(mockGenerateContent).toHaveBeenCalled();
	});

	it('should clean markdown code blocks from response', async () => {
		const mockResponseText =
			'```json\n' +
			JSON.stringify({
				question: "What is Bob's favorite movie?",
				type: 'preference'
			}) +
			'\n```';

		mockGenerateContent.mockResolvedValue({
			response: {
				text: () => mockResponseText
			}
		});

		const result = await generatePersonalQuestion('Bob');

		expect(result).toEqual({
			question: "What is Bob's favorite movie?",
			type: 'preference'
		});
	});

	it('should return a fallback question if API fails', async () => {
		mockGenerateContent.mockRejectedValue(new Error('API Error'));

		// We expect it NOT to throw, but to return a fallback
		const result = await generatePersonalQuestion('Bob');

		expect(result).toHaveProperty('question');
		expect(result).toHaveProperty('type');
		expect(result.question).toContain('Bob');
	});
});
