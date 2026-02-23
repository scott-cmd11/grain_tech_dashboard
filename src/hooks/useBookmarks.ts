import { useSavedArticles } from './useSavedArticles';
import { useWatchlist } from './useWatchlist';

export type BookmarkType = 'article' | 'company';

export interface BookmarkItem {
    type: BookmarkType;
    id: string | number;
    label: string;
    subtitle: string;
    url?: string;
    savedAt: string;
}

/**
 * Unified bookmark hook — wraps both useSavedArticles and useWatchlist
 * into a single collection interface.
 */
export function useBookmarks() {
    const articles = useSavedArticles();
    const companies = useWatchlist();

    // Merge into unified list, sorted by date
    const allBookmarks: BookmarkItem[] = [
        ...articles.savedArticles.map(a => ({
            type: 'article' as BookmarkType,
            id: a.id,
            label: a.title,
            subtitle: a.source,
            url: a.url,
            savedAt: a.savedAt,
        })),
        ...companies.watchlist.map(c => ({
            type: 'company' as BookmarkType,
            id: c.id,
            label: c.name,
            subtitle: `${c.country} · ${c.type}`,
            savedAt: c.addedAt,
        })),
    ].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());

    const totalCount = articles.savedCount + companies.watchlistCount;

    const removeBookmark = (type: BookmarkType, id: string | number) => {
        if (type === 'article') {
            articles.unsaveArticle(id as string);
        } else {
            companies.removeFromWatchlist(id as number);
        }
    };

    const clearAll = () => {
        articles.clearAll();
        companies.clearWatchlist();
    };

    return {
        allBookmarks,
        totalCount,
        removeBookmark,
        clearAll,
        // Pass through original hook methods for backward compatibility
        articles,
        companies,
    };
}

export default useBookmarks;
