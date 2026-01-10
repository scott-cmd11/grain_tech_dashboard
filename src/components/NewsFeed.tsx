import { memo, useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Newspaper,
  Search
} from 'lucide-react';


interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  imageUrl?: string;
  category?: string;
}

// Fallback sample news data (displays when API is unavailable, e.g., local dev)
const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'fallback-1',
    title: 'Grain inspectors could use more technology, lawmakers told',
    source: 'Agri-Pulse',
    date: new Date().toISOString(),
    summary: 'Witnesses at a House Agriculture subcommittee hearing emphasized that grain inspectors need access to new technology to improve efficiency and accuracy.',
    url: 'https://www.agri-pulse.com/articles/23117-grain-inspectors-could-use-more-technology-lawmakers-told',
    category: 'Regulation',
  },
  {
    id: 'fallback-2',
    title: 'ZoomAgri lands $6m from GrainCorp and others',
    source: 'AgFunderNews',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    summary: 'ZoomAgri lands $6m from GrainCorp and others to expand AI-powered grain inspection system across Australian grain handling facilities.',
    url: 'https://agfundernews.com/zoomagri-lands-6m-from-graincorp-and-others-to-expand-ai-powered-grain-inspection-system',
    category: 'Industry',
  },
  {
    id: 'fallback-3',
    title: 'Ground Truth Agriculture Advancing Grain Grading',
    source: 'SaskTrade',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    summary: 'Ground Truth Agriculture uses a combination of machine vision and near-infrared spectroscopy (NIRS) to analyze grain quality with unprecedented precision.',
    url: 'https://investsk.ca/2025/05/13/ground-truth-agriculture-advancing-grain-grading-with-cutting-edge-agtech/',
    category: 'Innovation',
  },
  {
    id: 'fallback-4',
    title: 'GoMicro AI web app live for five Australian crops',
    source: 'Grain Central',
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    summary: 'GoMicro AI grain assessment technology is now available as a web app for wheat, barley, canola, lentils and peas, enabling farmers to check quality in the field.',
    url: 'https://www.graincentral.com/ag-tech/gomicro-ai-web-app-live-for-five-australian-crops/',
    category: 'Technology',
  },
  {
    id: 'fallback-5',
    title: 'AI-powered grain quality assessment gains traction globally',
    source: 'Reuters',
    date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    summary: 'Agricultural technology companies are increasingly deploying AI and machine learning to assess grain quality, reducing reliance on manual inspection methods.',
    url: 'https://www.reuters.com/technology/ai-powered-grain-quality-assessment-gains-traction/',
    category: 'Technology',
  },
  {
    id: 'fallback-6',
    title: 'FOSS introduces new grain analysis instrument',
    source: 'World Grain',
    date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    summary: 'FOSS has launched a new spectroscopic analyzer for grain testing that promises faster and more accurate results for commercial grain handlers.',
    url: 'https://www.world-grain.com/articles/foss-introduces-new-grain-analysis-instrument',
    category: 'Industry',
  },
];

// Fetch from our API endpoint, with fallback for local development
async function fetchFromAPI(): Promise<{ articles: NewsItem[], lastUpdated: string }> {
  try {
    const response = await fetch('/api/news', {
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    if (data.articles && data.articles.length > 0) {
      return {
        articles: data.articles,
        lastUpdated: data.lastUpdated || new Date().toISOString()
      };
    }
    throw new Error('No articles in response');
  } catch (error) {
    console.warn('API unavailable, using fallback data:', error);
    // Return fallback data for local development
    return {
      articles: FALLBACK_NEWS,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const NewsFeed = memo(function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError(null);

      try {
        const { articles, lastUpdated: timestamp } = await fetchFromAPI();

        if (articles.length > 0) {
          setNews(articles);
          setLastUpdated(timestamp);
        } else {
          setError('No articles found. Please try again later.');
        }
      } catch (err) {
        console.error('Failed to load news', err);
        setError('Failed to fetch latest updates');
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  // Client-side search filtering
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return news;
    const query = searchQuery.toLowerCase();
    return news.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query)
    );
  }, [news, searchQuery]);

  const displayedNews = showAll ? filteredNews : filteredNews.slice(0, 9);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Updated: {new Date(lastUpdated).toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* News Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Newspaper className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 display-font">
              Market Intelligence
            </h3>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Powered by Google Alerts
          </span>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="h-36 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-center text-red-800 dark:text-red-200">
            {error}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>{searchQuery ? 'No articles match your search.' : 'No articles found.'}</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displayedNews.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md h-full"
              >
                <div className="p-5 flex flex-col h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50">
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                        {item.source}
                      </span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-indigo-600 transition-colors">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h4>
                  </div>

                  {/* Summary snippet if available and not same as title */}
                  {item.summary && item.summary !== item.title && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
                      {item.summary}
                    </p>
                  )}

                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    >
                      Read Article
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {news.length > 9 && !loading && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-8 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            {showAll ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show all {news.length} articles <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
});

export default NewsFeed;
