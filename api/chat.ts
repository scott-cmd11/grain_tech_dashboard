import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
    runtime: 'edge', // Use Edge runtime for better performance
};

const API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    if (!API_KEY) {
        console.error('Missing GEMINI_API_KEY environment variable');
        return new Response(JSON.stringify({ error: 'Server configuration error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { history, message, context } = await req.json();

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

        // Construct history with injected context
        const chatHistory = [
            {
                role: 'user',
                parts: [{ text: context || '' }],
            },
            {
                role: 'model',
                parts: [{ text: 'Understood. I am ready to answer questions about the GrainTech Dashboard.' }],
            },
            ...history.map((msg: any) => ({
                role: msg.role,
                parts: [{ text: msg.parts }], // Ensure parts is an array of objects
            })),
        ];

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Error processing request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
