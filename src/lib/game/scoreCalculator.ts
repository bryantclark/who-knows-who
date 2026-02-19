import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY, MINSTRAL_API_KEY } from '$env/static/private';

export async function calculateBatchScores(
	question: string,
	correctAnswer: string,
	guesses: Record<string, string>
): Promise<Record<string, number>> {
	const apiKey = GEMINI_API_KEY;
	const scores: Record<string, number> = {};
	const pendingGuesses: Record<string, string> = {};

	// 1. Local Exact/Fuzzy Match (Short Circuit)
	const cleanCorrect = correctAnswer.toLowerCase().trim();

	for (const [id, guess] of Object.entries(guesses)) {
		const cleanGuess = guess.toLowerCase().trim();

		// Short circuit for empty inputs
		if (!cleanGuess || !cleanCorrect) {
			scores[id] = 0;
			continue;
		}

		// Exact match
		if (cleanGuess === cleanCorrect) {
			scores[id] = 1;
			continue;
		}

		// Simple typo check (Levenshtein distance <= 2 for words > 3 chars)
		if (cleanGuess.length > 3 && Math.abs(cleanGuess.length - cleanCorrect.length) <= 2) {
			if (levenshteinDistance(cleanGuess, cleanCorrect) <= 2) {
				scores[id] = 1;
				continue;
			}
		}

		// If not matched locally, add to pending for AI
		pendingGuesses[id] = guess;
		// Default to 0 in case AI fails or returns nothing
		scores[id] = 0;
	}

	// If no pending guesses, return immediately
	if (Object.keys(pendingGuesses).length === 0) {
		return scores;
	}

	const prompt = `System: You are a semantic judge for a trivia game.
Question: "${question}"
Correct Answer: "${correctAnswer}"

Candidates to evaluate:
${JSON.stringify(pendingGuesses, null, 2)}

Task:
- Determine if each candidate answer is semantically "correct" or "close enough" (synonyms, misspellings, core concept matches).
- Return a JSON object mapping the candidate ID to 1 (correct) or 0 (incorrect).
- Strict JSON only. No markdown.

Example Output:
{
  "user1": 1,
  "user2": 0
}`;

	// 2. Try Mistral Grading if available
	if (MINSTRAL_API_KEY) {
		try {
			const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${MINSTRAL_API_KEY}`
				},
				body: JSON.stringify({
					model: 'mistral-large-latest',
					messages: [{ role: 'user', content: prompt }],
					response_format: { type: 'json_object' }
				})
			});

			if (response.ok) {
				const data = await response.json();
				const content = data.choices[0]?.message?.content;
				if (content) {
					const aiScores = JSON.parse(content) as Record<string, number>;
					for (const [id, score] of Object.entries(aiScores)) {
						if (typeof score === 'number') {
							scores[id] = score === 1 ? 1 : 0;
						}
					}
					console.log('Grading completed via Mistral');
					return scores;
				}
			}
			console.warn('Mistral grading failed, falling back to Gemini.');
		} catch (error) {
			console.error('Mistral grading error:', error);
		}
	}

	// 3. Fallback to Gemini
	if (!apiKey) {
		console.warn('Neither Mistral nor Gemini API keys are configured, skipping AI grading');
		return scores;
	}

	// 4. Batch AI Grading
	try {
		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

		const result = await model.generateContent(prompt);
		const text = result.response.text();
		const cleanText = text.replace(/```json|```/g, '').trim();
		const aiScores = JSON.parse(cleanText) as Record<string, number>;

		// Merge AI scores
		for (const [id, score] of Object.entries(aiScores)) {
			// Ensure we only update if it's 1, or just overwrite current 0
			if (typeof score === 'number') {
				scores[id] = score === 1 ? 1 : 0;
			}
		}
	} catch (error) {
		console.error('Batch AI grading failed:', error);
		// Fallback is already 0
	}

	return scores;
}

function levenshteinDistance(a: string, b: string): number {
	const matrix = [];

	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					Math.min(
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1 // deletion
					)
				);
			}
		}
	}

	return matrix[b.length][a.length];
}
