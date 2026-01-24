import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Bot, RotateCcw, Trash2, History } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToGemini } from '../../utils/gemini';
import { useChatStorage, type ChatMessage } from '../../hooks/useChatStorage';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        messages,
        setMessages,
        addMessage,
        isRestoredSession,
        newConversation,
        clearHistory
    } = useChatStorage();
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showRestoredBanner, setShowRestoredBanner] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Show restored session banner briefly when chat opens
    useEffect(() => {
        if (isOpen && isRestoredSession) {
            setShowRestoredBanner(true);
            const timeout = setTimeout(() => setShowRestoredBanner(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, isRestoredSession]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: 'user', parts: inputValue.trim() };
        addMessage(userMsg);
        setInputValue('');
        setIsLoading(true);

        const responseText = await sendMessageToGemini(messages, userMsg.parts);

        const botMsg: ChatMessage = { role: 'model', parts: responseText };
        // Use setMessages to add bot response (addMessage triggers storage save)
        setMessages(prev => [...prev, botMsg]);
        setIsLoading(false);
    };

    const handleNewConversation = () => {
        newConversation();
    };

    const handleClearHistory = () => {
        if (window.confirm('Clear all chat history? This cannot be undone.')) {
            clearHistory();
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105
          ${isOpen
                        ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rotate-90'
                        : 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:shadow-emerald-500/25'
                    }`}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh]
                   bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 
                   flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
                   ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-4 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-white">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">GrainTech AI</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> Powered by Gemini
                                </p>
                            </div>
                        </div>
                        {/* Chat Controls */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleNewConversation}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                                title="New Conversation"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleClearHistory}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                                title="Clear History"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Restored Session Banner */}
                {showRestoredBanner && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2 animate-fade-in">
                        <History className="w-3.5 h-3.5" />
                        <span>Conversation restored from previous session</span>
                    </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950/50">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm
                  ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'
                                    }`}
                            >
                                {msg.role === 'model' ? (
                                    <div
                                        className="prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900"
                                    >
                                        <ReactMarkdown>
                                            {msg.parts}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.parts
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about regulations, companies..."
                            className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                         bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 
                         text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 
                         rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 mt-2">
                        AI can make mistakes. Check important info.
                    </p>
                </form>
            </div>
        </>
    );
}
