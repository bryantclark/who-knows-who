import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';

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

Output ONLY valid JSON.`;

export async function generatePersonalQuestion(answerer: string): Promise<QuestionData> {
  const apiKey = GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not configured, using fallback question.');
    return getRandomFallback(answerer);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Updated model name

    const prompt = SYSTEM_PROMPT.replace('{{answerer}}', answerer).replace(
      '{{answerer}}',
      answerer
    ); // Replace multiple occurrences if needed

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
    return getRandomFallback(answerer);
  }
}

function getRandomFallback(answerer: string): QuestionData {
  const fallback = FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
  // Replace "your" with "answerer's" if needed, but the fallbacks use "your" which might need adjustment
  // Actually, the original code used "answerer's" in the template.
  // My CONSTANTS above use "your". Let's fix that dynamically or just use generic versions.
  // The original used `${answerer}`.

  // Let's adjust the fallback usage to be consistent.
  // We will treat the fallbacks as templates too.
  return {
    question: fallback.question.replace('your', `${answerer}'s`).replace('you', answerer),
    type: fallback.type
  };
}
