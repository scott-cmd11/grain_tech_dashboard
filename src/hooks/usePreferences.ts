import { useState, useEffect, useCallback } from 'react';
import type { TabId } from '../types';

interface DashboardPreferences {
    defaultTab: TabId;
    sidebarOpen: boolean;
    lastVisitedTab: TabId;
}

const STORAGE_KEY = 'graintech-preferences';

const defaultPreferences: DashboardPreferences = {
    defaultTab: 'about',
    sidebarOpen: true,
    lastVisitedTab: 'about',
};

/**
 * Hook for managing dashboard preferences in localStorage
 */
export function usePreferences() {
    const [preferences, setPreferences] = useState<DashboardPreferences>(defaultPreferences);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load preferences from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Partial<DashboardPreferences>;
                setPreferences({ ...defaultPreferences, ...parsed });
            }
        } catch {
            // Invalid stored data, use defaults
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever preferences change
    useEffect(() => {
        if (!isLoaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        } catch {
            console.warn('Failed to save preferences to localStorage');
        }
    }, [preferences, isLoaded]);

    // Update a single preference
    const updatePreference = useCallback(<K extends keyof DashboardPreferences>(
        key: K,
        value: DashboardPreferences[K]
    ) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    }, []);

    // Update the last visited tab (called when navigating)
    const setLastVisitedTab = useCallback((tab: TabId) => {
        setPreferences(prev => ({ ...prev, lastVisitedTab: tab }));
    }, []);

    // Set the default starting tab
    const setDefaultTab = useCallback((tab: TabId) => {
        setPreferences(prev => ({ ...prev, defaultTab: tab }));
    }, []);

    // Get the initial tab to load (uses lastVisitedTab or defaultTab)
    const getInitialTab = useCallback((): TabId => {
        return preferences.lastVisitedTab || preferences.defaultTab;
    }, [preferences.lastVisitedTab, preferences.defaultTab]);

    // Reset all preferences to defaults
    const resetPreferences = useCallback(() => {
        setPreferences(defaultPreferences);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Ignore
        }
    }, []);

    return {
        preferences,
        isLoaded,
        updatePreference,
        setLastVisitedTab,
        setDefaultTab,
        getInitialTab,
        resetPreferences,
    };
}

export default usePreferences;
