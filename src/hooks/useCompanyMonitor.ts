import { useState, useEffect, useCallback } from 'react';

// ── Types ──

export interface HealthResult {
    status: number | null;
    responseMs: number;
    online: boolean;
}

export interface NewsArticle {
    title: string;
    url: string;
    date: string;
    source: string;
}

export interface CompanyMonitorData {
    updatedAt: string;
    health: Record<string, HealthResult>;
    news: Record<string, { articles: NewsArticle[] }>;
}

interface UseCompanyMonitorReturn {
    data: CompanyMonitorData | null;
    isLoading: boolean;
    error: string | null;
    lastUpdated: string | null;
    refetch: () => void;
}

// Determine the API base URL depending on environment
function getApiUrl(): string {
    // In production, use relative path (Vercel handles routing)
    // In development, Vite proxies /api to the dev server or we use the full URL
    if (import.meta.env.DEV) {
        // If running with Vercel CLI (vercel dev), /api works directly
        // If running with vite only, this will 404 — that's expected, use vercel dev
        return '/api/company-monitor';
    }
    return '/api/company-monitor';
}

// ── Hook ──

export function useCompanyMonitor(enabled = true): UseCompanyMonitorReturn {
    const [data, setData] = useState<CompanyMonitorData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(getApiUrl());

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const json: CompanyMonitorData = await res.json();
            setData(json);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            console.warn('[CompanyMonitor] Fetch failed:', message);
        } finally {
            setIsLoading(false);
        }
    }, [enabled]);

    useEffect(() => {
        if (enabled) {
            fetchData();
        }
    }, [fetchData, enabled]);

    return {
        data,
        isLoading,
        error,
        lastUpdated: data?.updatedAt ?? null,
        refetch: fetchData,
    };
}
