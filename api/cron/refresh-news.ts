import type { VercelRequest, VercelResponse } from '@vercel/node';

interface RSSItem {
    title: string;
    link: string;
    description?: string;
    pubDate?: string;
}

interface NewsItem {
    id: string;
    title: string;
    source: string;
    date: string;
    summary: string;
    url: string;
    category: string;
}

// Grain-focused RSS feeds
const GRAIN_FEEDS = [
    { name: 'GrainsWest', url: 'https://grainswest.com/feed/', category: 'industry' },
    { name: 'Grain Central', url: 'https://www.graincentral.com/feed/', category: 'industry' },
    { name: 'Ag Funder News', url: 'https://agfundernews.com/feed', category: 'technology' },
    { name: 'Future Farming', url: 'https://www.futurefarming.com/feed/', category: 'technology' },
];

import { XMLParser } from 'fast-xml-parser';

// ... (interfaces remain same)

// XML Parser Configuration
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
});

function parseRSSItems(xml: string): RSSItem[] {
    try {
        const jsonObj = parser.parse(xml);
        const channel = jsonObj?.rss?.channel || jsonObj?.feed;
        if (!channel) return [];

        const items = Array.isArray(channel.item) ? channel.item : (channel.item ? [channel.item] : []);

        return items.map((item: any) => ({
            title: item.title || '',
            link: item.link || '',
            description: (item.description || item.summary || '').slice(0, 200),
            pubDate: item.pubDate || item.published || '',
        })).filter((i: RSSItem) => i.title && i.link);
    } catch (e) {
        console.error("XML Parsing Error", e);
        return [];
    }
}

async function fetchFeed(feedUrl: string): Promise<RSSItem[]> {
    try {
        const response = await fetch(feedUrl, {
            headers: { 'User-Agent': 'GrainTech-Bot/1.0' },
        });

        if (!response.ok) return [];

        const xml = await response.text();
        return parseRSSItems(xml);
    } catch {
        console.error(`Failed to fetch ${feedUrl}`);
        return [];
    }
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Verify cron secret (REQUIRED)
    const authHeader = req.headers.authorization;
    if (!process.env.CRON_SECRET) {
        console.error('CRON_SECRET environment variable is not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const allArticles: NewsItem[] = [];
        let idCounter = 1;

        // Fetch all feeds in parallel
        const feedPromises = GRAIN_FEEDS.map(async (feed) => {
            const items = await fetchFeed(feed.url);
            return items.map((item) => ({
                id: String(idCounter++),
                title: item.title,
                source: feed.name,
                date: item.pubDate ? new Date(item.pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
                summary: item.description || '',
                url: item.link,
                category: feed.category,
            }));
        });

        const results = await Promise.all(feedPromises);
        results.forEach((items) => allArticles.push(...items));

        // Sort by date (newest first) and limit
        const sortedArticles = allArticles
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 20);

        // Re-assign IDs after sorting
        sortedArticles.forEach((article, index) => {
            article.id = String(index + 1);
        });

        return res.status(200).json({
            success: true,
            count: sortedArticles.length,
            updated_at: new Date().toISOString(),
            articles: sortedArticles,
        });
    } catch (error) {
        console.error('Cron error:', error);
        return res.status(500).json({ error: 'Failed to refresh news' });
    }
}
