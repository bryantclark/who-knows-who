import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';

export async function generatePersonalQuestion(answerer: string) {
  const apiKey = GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

  const prompt = `You are a witty and insightful social gameshow host for "Who Knows Who".
  Generate a fun, surprising, and engaging social trivia question for ${answerer}.
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
  - The question should be specific enough to have a clear "correct" answer from ${answerer}.
  - Format as a JSON object with 'question' (string) and 'type' (one of the categories).
  - Make sure the questions are safe for children.
  - Keep the questions fairly short and to the point.

  EXAMPLES:
  - "If ${answerer} won $10,000 today but had to spend it on a hobby, what would it be?"
  - "Which movie character does ${answerer} secretly believe is their personality twin?"
  - "What is the one food ${answerer} absolutely refuses to eat, even if they were starving?"
  - "What was ${answerer}'s very first screen name or email address?"
  - "If ${answerer} was stranded on a desert island, which one friend would they want with them for survival?"

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
