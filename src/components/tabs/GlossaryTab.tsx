import { useState, useEffect, useMemo, useRef } from 'react';
import { BookOpen, Search, X, Hash } from 'lucide-react';
import { glossaryTerms } from '../../data/glossary';
import { Skeleton } from '../Skeleton';

export function GlossaryTab({ searchTerm = "" }: { searchTerm?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Sync external search term
  useEffect(() => {
    if (searchTerm !== undefined) {
      setSearchQuery(searchTerm);
    }
  }, [searchTerm]);



  // Filter terms
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return glossaryTerms;
    const query = searchQuery.toLowerCase();
    return glossaryTerms.filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group terms (A-Z)
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof glossaryTerms> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <Skeleton className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-6">
            <div className="shrink-0 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
              <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Industry Glossary
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                Clear, verified definitions for grain technology, inspection standards, and AI terminology.
              </p>
            </div>
          </div>

          <div className="relative max-w-2xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search definition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 text-base border-2 border-gray-100 dark:border-gray-700 rounded-xl
                        focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all
                        bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Jump Index - Only show if no search filter */}
      {!searchQuery && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Hash className="w-3 h-3" />
            <span>Quick Index</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(groupedTerms).sort().map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`section-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg
                            bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-110
                            dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400
                            transition-all cursor-pointer"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Terms List */}
      <div className="space-y-8">
        {Object.entries(groupedTerms)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter, terms]) => (
            <div key={letter} id={`section-${letter}`} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white font-bold text-lg shadow-sm">
                  {letter}
                </span>
                <div className="h-px flex-1 bg-gray-100 dark:bg-gray-700"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {terms.map((term) => (
                  <div
                    key={term.term}
                    id={`term-${term.term}`}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 
                             border border-gray-100 dark:border-gray-700
                             hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:-translate-y-1
                             transition-all duration-300 ease-out"
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {term.term}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {term.definition}
                      </p>

                      {term.example && (
                        <div className="pt-3 mt-3 border-t border-gray-50 dark:border-gray-700/50">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block mb-1">
                            Example
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                            "{term.example}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No definitions found for "<span className="font-semibold text-gray-900 dark:text-white">{searchQuery}</span>"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Clear search filter
          </button>
        </div>
      )}
    </div>
  );
}
