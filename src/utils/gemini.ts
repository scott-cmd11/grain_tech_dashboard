import { getDashboardContext } from "./aiContext";

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface ChatMessage {
    role: "user" | "model";
    parts: string;
}

export const sendMessageToGemini = async (
    history: ChatMessage[],
    newMessage: string
): Promise<string> => {
    try {
        const context = getDashboardContext();

        // Local Development Fallback: Use direct API if in DEV mode and key exists
        if (import.meta.env.DEV && API_KEY) {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

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
            });

            const result = await chat.sendMessage(newMessage);
            const response = await result.response;
            return response.text();
        }

        // Production / Proxy Mode
        const response = await fetch('/api/chat', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                history,
                message: newMessage,
                context
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error: any) {
        console.error("Chat Error:", error);
        return `Error: ${error.message || "Something went wrong. Please check your network connection."}`;
    }
};

export const initializeGemini = () => true; // No-op now, as init happens on server

