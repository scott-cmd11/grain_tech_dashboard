import { getDashboardContext } from "./aiContext";

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

        // Always use the secure server proxy (no client-side API key exposure)
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

