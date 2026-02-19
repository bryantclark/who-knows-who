import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generatePersonalQuestion } from './questionGenerator';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the environment variables properly
vi.mock('$env/static/private', () => ({
	GEMINI_API_KEY: 'test-gemini-key',
	MINSTRAL_API_KEY: 'test-mistral-key'
}));

// Mock the GoogleGenerativeAI class
const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn();

vi.mock('@google/generative-ai', () => {
	return {
		GoogleGenerativeAI: vi.fn().mockImplementation(function () {
			return {
				getGenerativeModel: mockGetGenerativeModel
			};
		})
	};
});

describe('generatePersonalQuestion', () => {
	const mockFetch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		mockGetGenerativeModel.mockReturnValue({
			generateContent: mockGenerateContent
		});

		// Default fetch mock
		mockFetch.mockResolvedValue({
			ok: true,
			json: async () => ({
				choices: [
					{
						message: {
							content: JSON.stringify({
								question: "What is Bob's favorite movie?",
								type: 'preference'
							})
						}
					}
				]
			})
		});
		vi.stubGlobal('fetch', mockFetch);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('should return a parsed JSON question when Mistral succeeds', async () => {
		const result = await generatePersonalQuestion('Bob');

		expect(result).toEqual({
			question: "What is Bob's favorite movie?",
			type: 'preference'
		});
		// Verify fetch was called (Mistral is tried first)
		expect(global.fetch).toHaveBeenCalled();
	});

	it('should fallback to Gemini if Mistral fails', async () => {
		// Mock Mistral failure
		mockFetch.mockResolvedValue({ ok: false });

		const mockResponseText = JSON.stringify({
			question: "What is Bob's dream job?",
			type: 'interest'
		});

		mockGenerateContent.mockResolvedValue({
			response: {
				text: () => mockResponseText
			}
		});

		const result = await generatePersonalQuestion('Bob');

		expect(result).toEqual({
			question: "What is Bob's dream job?",
			type: 'interest'
		});
		expect(mockGenerateContent).toHaveBeenCalled();
	});

	it('should clean markdown code blocks from Gemini response', async () => {
		mockFetch.mockResolvedValue({ ok: false }); // Skip Mistral

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

	it('should return a fallback question if both APIs fail', async () => {
		mockFetch.mockResolvedValue({ ok: false });
		mockGenerateContent.mockRejectedValue(new Error('API Error'));

		const result = await generatePersonalQuestion('Bob');

		expect(result).toHaveProperty('question');
		expect(result).toHaveProperty('type');
		expect(result.question).toContain('Bob');
	});

	it('should include previous questions in the prompt', async () => {
		const previousQuestions = ["What is Bob's favorite movie?", "What is Bob's dream job?"];
		await generatePersonalQuestion('Bob', previousQuestions);

		// Check the prompt sent to fetch (Mistral)
		const fetchMock = vi.mocked(global.fetch);
		const body = JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
		const prompt = body.messages[0].content;

		expect(prompt).toContain("What is Bob's favorite movie?");
		expect(prompt).toContain("What is Bob's dream job?");
		expect(prompt).toContain('IMPORTANT: Do NOT generate any of these previous questions');
	});

	it('should avoid previous questions in fallback logic', async () => {
		// Force fallback logic by making APIs return empty/fail
		mockFetch.mockResolvedValue({ ok: false });
		mockGenerateContent.mockRejectedValue(new Error('Fail'));

		const previousQuestions = [
			"What is Bob's favorite movie?",
			"What is Bob's dream job?",
			'What food does Bob hate the most?',
			'If Bob could travel anywhere, where would Bob go?'
		];
		// The only one left should be "What was Bob's first pet's name?"

		const result = await generatePersonalQuestion('Bob', previousQuestions);

		expect(result.question).toBe("What was Bob's first pet's name?");
	});
});
