import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY, MINSTRAL_API_KEY } from '$env/static/private';

export interface QuestionData {
	question: string;
	type: 'preference' | 'habit' | 'interest' | 'past' | 'wildcard';
}

const FALLBACK_QUESTIONS: QuestionData[] = [
	{ question: 'What is your favorite movie?', type: 'preference' },
	{ question: 'What is your dream job?', type: 'interest' },
	{ question: 'What food do you hate the most?', type: 'preference' },
	{ question: 'If you could travel anywhere, where would you go?', type: 'wildcard' },
	{ question: "What was your first pet's name?", type: 'past' }
];

const SYSTEM_PROMPT = `You are a witty and insightful social gameshow host for "Who Knows Who".
Generate a fun, surprising, and engaging social trivia question for {{answerer}}.
The goal is to test how well their friends actually know them through personal details, quirks, and preferences.

CATEGORIES:
- 'preference': Deep cuts on tastes (not just "favorite color").
- 'habit': Quirky things they do daily.
- 'interest': Passion projects or obsessions.
- 'past': Surprising history or milestones.
- 'wildcard': Fun, hypothetical, or "most likely to" style questions.

RULES:
- Do NOT assume specific facts. Use a template that works for anyone.
- Be creative! Avoid cliches.
- The question should be specific enough to have a clear "correct" answer from {{answerer}}.
- Format as a JSON object with 'question' (string) and 'type' (one of the categories).
- Make sure the questions are safe for children.
- Keep the questions fairly short and to the point.
{{avoid_instruction}}

Output ONLY valid JSON.`;

export async function generatePersonalQuestion(
	answerer: string,
	previousQuestions: string[] = []
): Promise<QuestionData> {
	const avoidInstruction =
		previousQuestions.length > 0
			? `- IMPORTANT: Do NOT generate any of these previous questions: ${previousQuestions.join(', ')}`
			: '';

	const prompt = SYSTEM_PROMPT.replace(/{{answerer}}/g, answerer).replace(
		/{{avoid_instruction}}/g,
		avoidInstruction
	);

	// 1. Try Mistral if available
	if (MINSTRAL_API_KEY) {
		try {
			const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${MINSTRAL_API_KEY}`
				},
				body: JSON.stringify({
					model: 'pixtral-large-latest',
					messages: [{ role: 'user', content: prompt }],
					response_format: { type: 'json_object' }
				})
			});

			if (response.ok) {
				const data = await response.json();
				const content = data.choices[0]?.message?.content;
				if (content) {
					const parsed = JSON.parse(content) as QuestionData;
					if (parsed.question && parsed.type) {
						console.log('Question generated via Mistral');
						return parsed;
					}
				}
			}
			console.warn('Mistral generation failed or returned invalid data, falling back to Gemini.');
		} catch (error) {
			console.error('Mistral generation error:', error);
		}
	}

	// 2. Fallback to Gemini
	const apiKey = GEMINI_API_KEY;
	if (!apiKey) {
		console.warn('Neither Mistral nor Gemini API keys are configured, using static fallback.');
		return getRandomFallback(answerer, previousQuestions);
	}

	try {
		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

		const result = await model.generateContent(prompt);
		const responseText = result.response.text();
		const cleanedResponse = responseText.replace(/```json|```/g, '').trim();

		const parsedResponse = JSON.parse(cleanedResponse) as QuestionData;

		// Basic validation
		if (!parsedResponse.question || !parsedResponse.type) {
			throw new Error('Invalid response format');
		}

		return parsedResponse;
	} catch (error) {
		console.error('Question generation failed:', error);
		return getRandomFallback(answerer, previousQuestions);
	}
}

function getRandomFallback(answerer: string, previousQuestions: string[] = []): QuestionData {
	const availableFallbacks = FALLBACK_QUESTIONS.filter((f) => {
		let questionText = f.question
			.replace(/your/g, `${answerer}'s`)
			.replace(/do you/g, `does ${answerer}`)
			.replace(/are you/g, `is ${answerer}`)
			.replace(/you/g, answerer);
		return !previousQuestions.includes(questionText);
	});

	const sourceList = availableFallbacks.length > 0 ? availableFallbacks : FALLBACK_QUESTIONS;
	const fallback = sourceList[Math.floor(Math.random() * sourceList.length)];

	return {
		question: fallback.question
			.replace(/your/g, `${answerer}'s`)
			.replace(/do you/g, `does ${answerer}`)
			.replace(/are you/g, `is ${answerer}`)
			.replace(/you/g, answerer),
		type: fallback.type
	};
}
