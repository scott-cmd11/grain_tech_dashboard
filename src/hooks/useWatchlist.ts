import { useState, useEffect, useCallback } from 'react';

interface WatchlistItem {
    id: number;
    name: string;
    country: string;
    type: string;
    addedAt: string;
}

const STORAGE_KEY = 'graintech-company-watchlist';

/**
 * Hook for managing a company watchlist in localStorage
 */
export function useWatchlist() {
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
    const [watchlistIds, setWatchlistIds] = useState<Set<number>>(new Set());

    // Load watchlist from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const items: WatchlistItem[] = JSON.parse(stored);
                setWatchlist(items);
                setWatchlistIds(new Set(items.map(i => i.id)));
            }
        } catch {
            // Invalid stored data, start fresh
        }
    }, []);

    // Save to localStorage whenever watchlist changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
            setWatchlistIds(new Set(watchlist.map(i => i.id)));
        } catch {
            console.warn('Failed to save watchlist to localStorage');
        }
    }, [watchlist]);

    // Check if a company is in watchlist
    const isInWatchlist = useCallback((id: number): boolean => {
        return watchlistIds.has(id);
    }, [watchlistIds]);

    // Add a company to watchlist
    const addToWatchlist = useCallback((company: { id: number; name: string; country: string; type: string }) => {
        setWatchlist(prev => {
            if (prev.some(i => i.id === company.id)) return prev;
            return [{
                ...company,
                addedAt: new Date().toISOString(),
            }, ...prev];
        });
    }, []);

    // Remove a company from watchlist
    const removeFromWatchlist = useCallback((id: number) => {
        setWatchlist(prev => prev.filter(i => i.id !== id));
    }, []);

    // Toggle watchlist status
    const toggleWatchlist = useCallback((company: { id: number; name: string; country: string; type: string }) => {
        if (watchlistIds.has(company.id)) {
            removeFromWatchlist(company.id);
        } else {
            addToWatchlist(company);
        }
    }, [watchlistIds, addToWatchlist, removeFromWatchlist]);

    // Clear entire watchlist
    const clearWatchlist = useCallback(() => {
        setWatchlist([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Ignore
        }
    }, []);

    return {
        watchlist,
        watchlistCount: watchlist.length,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        clearWatchlist,
    };
}

export default useWatchlist;
