import { memo, useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Newspaper,
  Search
} from 'lucide-react';
import curatedNews from '../data/curatedNews.json';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  imageUrl?: string;
  category?: string;
  score?: number;
}

export const NewsFeed = memo(function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate async load slightly for UI smoothness, but load directly from JSON
    const timer = setTimeout(() => {
      try {
        // Load curated news data - already has correct field names
        const sortedArticles = (curatedNews as NewsItem[]).sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNews(sortedArticles);
        setLastUpdated(new Date().toISOString());
        setLoading(false);
      } catch (err) {
        console.error('Failed to load news', err);
        setError('Failed to load news data');
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
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
            Powered by Scout Agent
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
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md h-full relative"
              >
                <div className="p-5 flex flex-col h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50">
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                          {item.source}
                        </span>
                        {item.category && (
                          <span className="font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
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
