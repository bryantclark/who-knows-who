import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';

export async function calculateKnowledgeScore(
    question: string,
    guess: string,
    correctAnswer: string
) {
    const apiKey = GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    console.log('Evaluating semantic score:', { question, correctAnswer, guess });

    const prompt = `System: You are an expert semantic evaluator for a social trivia game.
    The goal is to determine if a user's guess is "close enough" to the target answer to be considered correct.

    Context:
    - Question: "${question}"
    - Correct Answer (from the source): "${correctAnswer}"
    - User's Guess: "${guess}"

    Evaluation Rules:
    - Be reasonably lenient with typos, abbreviations, and synonyms (e.g., "NY" should match "New York", "Coke" should match "Coca-Cola").
    - If the guess captures the core meaning/entity of the correct answer, it is correct.
    - If the guess is fundamentally different or a different category of thing, it is incorrect.

    Output format:
    - Respond with EXACTLY '1' if the guess is correct/close enough.
    - Respond with EXACTLY '0' if the guess is incorrect.
    - DO NOT include any other text or explanation.`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        if (text === '1') return 1;
        if (text === '0') return 0;

        // Handle cases where model might include extra text
        if (text.includes('1')) return 1;
        return 0;
    } catch (error) {
        console.error('AI Score calculation failed, using local fallback:', error);

        // Local Semantic Fallback (Fuzzy-ish match)
        const cleanGuess = guess.toLowerCase().trim();
        const cleanCorrect = correctAnswer.toLowerCase().trim();

        // 1. Exact match (case insensitive)
        if (cleanGuess === cleanCorrect) return 1;

        // 2. Simple inclusion (e.g., "brussel sprouts" vs "sprouts")
        if (cleanGuess.length > 3 && (cleanCorrect.includes(cleanGuess) || cleanGuess.includes(cleanCorrect))) {
            return 1;
        }

        // 3. Very basic typo check (if lengths are similar and first few chars match)
        if (Math.abs(cleanGuess.length - cleanCorrect.length) <= 2 && cleanGuess.substring(0, 3) === cleanCorrect.substring(0, 3)) {
            return 1;
        }

        return 0;
    }
}
