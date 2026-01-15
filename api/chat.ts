import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
    runtime: 'edge', // Use Edge runtime for better performance
};

const API_KEY = process.env.GEMINI_API_KEY;

// =============================================================================
// SECURITY: Rate Limiting
// =============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT) {
        return true;
    }

    record.count++;
    return false;
}

// =============================================================================
// SECURITY: Input Validation
// =============================================================================
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 50;

function validateInput(history: unknown, message: unknown): { valid: boolean; error?: string } {
    if (typeof message !== 'string') {
        return { valid: false, error: 'Message must be a string' };
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
        return { valid: false, error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters` };
    }
    if (message.trim().length === 0) {
        return { valid: false, error: 'Message cannot be empty' };
    }
    if (!Array.isArray(history)) {
        return { valid: false, error: 'History must be an array' };
    }
    if (history.length > MAX_HISTORY_LENGTH) {
        return { valid: false, error: `History exceeds ${MAX_HISTORY_LENGTH} messages` };
    }
    return { valid: true };
}

// =============================================================================
// SECURITY: CORS Headers
// =============================================================================
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'https://graintech-dashboard.vercel.app',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: Request) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    if (isRateLimited(ip)) {
        return new Response(JSON.stringify({ error: 'Too many requests. Please wait a moment.' }), {
            status: 429,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json', 'Retry-After': '60' },
        });
    }

    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS });
    }

    if (!API_KEY) {
        console.error('Missing GEMINI_API_KEY environment variable');
        return new Response(JSON.stringify({ error: 'Server configuration error' }), {
            status: 500,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
    }

    try {
        const { history, message, context } = await req.json();

        // Input validation
        const validation = validateInput(history, message);
        if (!validation.valid) {
            return new Response(JSON.stringify({ error: validation.error }), {
                status: 400,
                headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
            });
        }

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
                parts: [{ text: msg.parts }],
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
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Error processing request' }), {
            status: 500,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
    }
}
