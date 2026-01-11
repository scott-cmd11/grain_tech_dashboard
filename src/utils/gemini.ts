import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDashboardContext } from "./aiContext";

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

export const initializeGemini = (apiKey?: string) => {
    const key = apiKey || API_KEY;
    if (!key) {
        console.warn("Gemini API Key is missing");
        return false;
    }
    genAI = new GoogleGenerativeAI(key);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    return true;
};

export interface ChatMessage {
    role: "user" | "model";
    parts: string; // Using string for simple UI, mapped to [{ text: string }] for API
}

export const sendMessageToGemini = async (
    history: ChatMessage[],
    newMessage: string
): Promise<string> => {
    if (!model) {
        const success = initializeGemini();
        if (!success) {
            return "Error: API Key not configured. Please add VITE_GEMINI_API_KEY to your .env file.";
        }
    }

    try {
        const context = getDashboardContext();

        // Start chat with context as system instruction equivalent (or just first message)
        // using gemini-1.5-flash which supports system instructions usually, but simple chat.sendMessage works too.
        // simpler approach: prepend context to the chat logic or use systemInstruction if SDK supports it well.
        // For JS SDK, best to just render context in the prompt or use systemInstruction prop if valid.

        // We will use a fresh chat session for each message sequence to ensure context is fresh/injected
        // but typically we want to keep history.

        // Construct history for API
        // Note: The first message should ideally set the context.
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: context }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to answer questions about the GrainTech Dashboard." }]
                },
                ...history.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.parts }]
                }))
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(newMessage);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return `Error: ${error.message || "Something went wrong"}`;
    }
};
