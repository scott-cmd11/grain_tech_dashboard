import { useState, useEffect, useCallback } from 'react';

interface SavedArticle {
    id: string;
    title: string;
    source: string;
    url: string;
    savedAt: string;
}

const STORAGE_KEY = 'graintech-saved-articles';

/**
 * Hook for managing saved/bookmarked news articles in localStorage
 */
export function useSavedArticles() {
    const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

    // Load saved articles from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const articles: SavedArticle[] = JSON.parse(stored);
                setSavedArticles(articles);
                setSavedIds(new Set(articles.map(a => a.id)));
            }
        } catch {
            // Invalid stored data, start fresh
        }
    }, []);

    // Save to localStorage whenever articles change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticles));
            setSavedIds(new Set(savedArticles.map(a => a.id)));
        } catch {
            console.warn('Failed to save articles to localStorage');
        }
    }, [savedArticles]);

    // Check if an article is saved
    const isSaved = useCallback((id: string): boolean => {
        return savedIds.has(id);
    }, [savedIds]);

    // Save an article
    const saveArticle = useCallback((article: { id: string; title: string; source: string; url: string }) => {
        setSavedArticles(prev => {
            // Don't add duplicates
            if (prev.some(a => a.id === article.id)) return prev;
            return [{
                ...article,
                savedAt: new Date().toISOString(),
            }, ...prev];
        });
    }, []);

    // Remove a saved article
    const unsaveArticle = useCallback((id: string) => {
        setSavedArticles(prev => prev.filter(a => a.id !== id));
    }, []);

    // Toggle saved status
    const toggleSaved = useCallback((article: { id: string; title: string; source: string; url: string }) => {
        if (savedIds.has(article.id)) {
            unsaveArticle(article.id);
        } else {
            saveArticle(article);
        }
    }, [savedIds, saveArticle, unsaveArticle]);

    // Clear all saved articles
    const clearAll = useCallback(() => {
        setSavedArticles([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Ignore
        }
    }, []);

    return {
        savedArticles,
        savedCount: savedArticles.length,
        isSaved,
        saveArticle,
        unsaveArticle,
        toggleSaved,
        clearAll,
    };
}

export default useSavedArticles;
