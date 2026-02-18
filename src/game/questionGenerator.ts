import { GoogleGenerativeAI } from '@google/generative-ai';
import { VITE_GEMINI_API_KEY } from '$env/static/private';

export async function generatePersonalQuestion(answerer: string) {
	const apiKey = VITE_GEMINI_API_KEY;
	if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not configured');

	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

	const prompt = `Generate a fun and engaging social trivia question to ask ${answerer}.
  The question should be something their friends might know or would be fun to guess.
  Do NOT assume you know ${answerer} or specific facts about them.
  Instead, generate a question template that applies to them.

  Examples of good questions:
  - "What is ${answerer}'s absolute favorite comfort food?"
  - "If ${answerer} could travel anywhere tomorrow, where would they go?"
  - "What is a movie ${answerer} can quote line by line?"
  - "What is ${answerer}'s biggest pet peeve?"
  - "What was ${answerer}'s first concert?"

  The question should:
  - Be open-ended but have a specific answer.
  - Be fun for a group of friends.
  - Not be too generic (avoid "What is their favorite color?").
  - Be formatted as a JSON object with 'question' and 'type' fields.
  - Type should be one of: ['memory', 'preference', 'habit', 'interest', 'wildcard'].

  Output ONLY valid JSON.`;

	try {
		const result = await model.generateContent(prompt);
		const responseText = result.response.text();
		const cleanedResponse = responseText.replace(/```json|```/g, '').trim();
		const parsedResponse = JSON.parse(cleanedResponse);
		return parsedResponse;
	} catch (error) {
		console.error('Question generation failed:', error);
		// Fallback questions in case of API failure or parsing error
		const fallbackQuestions = [
			{ question: `What is ${answerer}'s favorite movie?`, type: 'preference' },
			{ question: `What is ${answerer}'s dream job?`, type: 'interest' },
			{ question: `What food does ${answerer} hate the most?`, type: 'preference' }
		];
		return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
	}
}
