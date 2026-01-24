import { useState, useEffect, useCallback } from 'react';

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

interface ChatSession {
    id: string;
    messages: ChatMessage[];
    createdAt: string;
    updatedAt: string;
}

const STORAGE_KEY = 'graintech-chat-session';
const WELCOME_MESSAGE: ChatMessage = {
    role: 'model',
    parts: "Hi! I'm the GrainTech AI Assistant. I can answer questions about grain grading technology, regulations, and companies listed on this dashboard. How can I help?"
};

/**
 * Hook for persisting chat conversations in localStorage
 */
export function useChatStorage() {
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
    const [sessionId, setSessionId] = useState<string>('');
    const [isRestoredSession, setIsRestoredSession] = useState(false);

    // Load session from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const session: ChatSession = JSON.parse(stored);
                // Only restore if there are messages beyond the welcome message
                if (session.messages && session.messages.length > 1) {
                    setMessages(session.messages);
                    setSessionId(session.id);
                    setIsRestoredSession(true);
                } else {
                    // Start fresh session
                    const newId = generateSessionId();
                    setSessionId(newId);
                }
            } else {
                // No previous session, create new
                const newId = generateSessionId();
                setSessionId(newId);
            }
        } catch {
            // Invalid stored data, start fresh
            const newId = generateSessionId();
            setSessionId(newId);
        }
    }, []);

    // Save to localStorage whenever messages change
    useEffect(() => {
        if (sessionId && messages.length > 0) {
            const session: ChatSession = {
                id: sessionId,
                messages,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
            } catch {
                // Storage might be full or unavailable
                console.warn('Failed to save chat session to localStorage');
            }
        }
    }, [messages, sessionId]);

    // Add a new message
    const addMessage = useCallback((message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
        setIsRestoredSession(false); // Clear restored indicator after new interaction
    }, []);

    // Start a new conversation
    const newConversation = useCallback(() => {
        const newId = generateSessionId();
        setMessages([WELCOME_MESSAGE]);
        setSessionId(newId);
        setIsRestoredSession(false);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Ignore storage errors
        }
    }, []);

    // Clear all history
    const clearHistory = useCallback(() => {
        newConversation();
    }, [newConversation]);

    return {
        messages,
        setMessages,
        addMessage,
        sessionId,
        isRestoredSession,
        newConversation,
        clearHistory,
        WELCOME_MESSAGE,
    };
}

function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export default useChatStorage;
