import { XMLParser } from 'fast-xml-parser';

export const config = {
    runtime: 'edge',
};

// ── Company registry (mirrors data/index.ts + grainTechEntities.ts) ──
// We keep a lightweight copy here because Edge functions can't import React modules.
const COMPANIES: { name: string; url: string; searchTerms?: string }[] = [
    { name: 'Cgrain', url: 'https://www.cgrain.ai', searchTerms: 'Cgrain grain' },
    { name: 'FOSS', url: 'https://www.fossanalytics.com', searchTerms: 'FOSS EyeFoss grain' },
    { name: 'Videometer', url: 'https://videometer.com', searchTerms: 'Videometer seed grain' },
    { name: 'Zeutec', url: 'https://spectraalyzer.com', searchTerms: 'Zeutec SpectraAlyzer grain' },
    { name: 'QualySense', url: 'https://www.qualysense.com', searchTerms: 'QualySense grain' },
    { name: 'ZoomAgri', url: 'https://zoomagri.com', searchTerms: 'ZoomAgri grain' },
    { name: 'GoMicro', url: 'https://www.gomicro.co', searchTerms: 'GoMicro grain' },
    { name: 'Cropify', url: 'https://www.cropify.io', searchTerms: 'Cropify grain grading' },
    { name: 'Deimos Laboratory', url: 'https://deimos.com.au', searchTerms: 'Deimos Laboratory grain' },
    { name: 'Ground Truth Ag', url: 'https://groundtruth.ag', searchTerms: 'Ground Truth Ag grain' },
    { name: 'Vibe Imaging Analytics', url: 'https://www.vibeia.com', searchTerms: 'Vibe Imaging grain' },
    { name: 'SuperGeo AI', url: 'https://sga.ai', searchTerms: 'SuperGeo AI grain grading' },
    { name: 'Grain Discovery', url: 'https://www.graindiscovery.com', searchTerms: 'Grain Discovery quality' },
    { name: 'Inarix', url: 'https://www.inarix.com', searchTerms: 'Inarix PocketLab grain' },
    { name: 'AgSure', url: 'https://www.agsure.in', searchTerms: 'AgSure grain analyzer India' },
    { name: 'Nebulaa', url: 'https://neo.nebulaa.in', searchTerms: 'Nebulaa MATT grain analyzer' },
    { name: 'GrainSense', url: 'https://grainsense.com', searchTerms: 'GrainSense NIR grain' },
    { name: 'Keyetech', url: 'https://en.keyetech.com', searchTerms: 'Keyetech grain analyzer' },
    { name: 'EasyODM', url: 'https://easyodm.tech', searchTerms: 'EasyODM grain analysis' },
    { name: 'Upjao', url: 'https://upjao.ai', searchTerms: 'Upjao grain quality AI' },
    { name: 'Grainkart', url: 'https://www.grainscope.ai', searchTerms: 'GrainScope AI grain' },
    { name: 'Platypus Vision', url: 'https://www.platypusvision.com', searchTerms: 'Platypus Vision grain' },
];

// ── Types ──
interface HealthResult {
    status: number | null;
    responseMs: number;
    online: boolean;
}

interface NewsArticle {
    title: string;
    url: string;
    date: string;
    source: string;
}

interface CompanyMonitorResponse {
    updatedAt: string;
    health: Record<string, HealthResult>;
    news: Record<string, { articles: NewsArticle[] }>;
}

// ── XML Parser ──
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
});

// ── Health Check ──
async function checkHealth(url: string): Promise<HealthResult> {
    const start = Date.now();
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            headers: { 'User-Agent': 'GrainTech-Monitor/1.0' },
            redirect: 'follow',
        });

        clearTimeout(timeout);
        return {
            status: res.status,
            responseMs: Date.now() - start,
            online: res.ok,
        };
    } catch {
        return {
            status: null,
            responseMs: Date.now() - start,
            online: false,
        };
    }
}

// ── Google News RSS Search ──
async function fetchCompanyNews(searchTerms: string): Promise<NewsArticle[]> {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const query = encodeURIComponent(searchTerms);
        const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en&gl=US&ceid=US:en`;

        const res = await fetch(rssUrl, {
            signal: controller.signal,
            headers: { 'User-Agent': 'GrainTech-Monitor/1.0' },
        });

        clearTimeout(timeout);

        if (!res.ok) return [];

        const xml = await res.text();
        const parsed = parser.parse(xml);
        const channel = parsed?.rss?.channel;
        if (!channel) return [];

        const items = Array.isArray(channel.item)
            ? channel.item
            : channel.item
                ? [channel.item]
                : [];

        return items.slice(0, 3).map((item: Record<string, string>) => ({
            title: (item.title || '').replace(/ - [^-]+$/, ''), // Strip " - Source Name" suffix
            url: item.link || '',
            date: item.pubDate
                ? new Date(item.pubDate).toISOString().slice(0, 10)
                : '',
            source: (item.source || item.title || '').replace(/^.* - /, ''), // Extract source name
        }));
    } catch {
        return [];
    }
}

// ── Main Handler ──
export default async function handler() {
    try {
        // Run health checks and news fetches in parallel
        const [healthResults, newsResults] = await Promise.all([
            // Health checks for all companies
            Promise.allSettled(
                COMPANIES.map(async (company) => ({
                    name: company.name,
                    result: await checkHealth(company.url),
                }))
            ),
            // News fetches for all companies
            Promise.allSettled(
                COMPANIES.map(async (company) => ({
                    name: company.name,
                    articles: await fetchCompanyNews(
                        company.searchTerms || company.name
                    ),
                }))
            ),
        ]);

        // Build response
        const response: CompanyMonitorResponse = {
            updatedAt: new Date().toISOString(),
            health: {},
            news: {},
        };

        for (const result of healthResults) {
            if (result.status === 'fulfilled') {
                response.health[result.value.name] = result.value.result;
            }
        }

        for (const result of newsResults) {
            if (result.status === 'fulfilled') {
                response.news[result.value.name] = {
                    articles: result.value.articles,
                };
            }
        }

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // Cache at CDN for 6 hours, serve stale for 1 hour while revalidating
                'Cache-Control': 's-maxage=21600, stale-while-revalidate=3600',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Company monitor error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to run company monitor' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
