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
    <div ref={containerRef} className="space-y-8">
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

          <div className="relative max-w-xl">
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

      {/* Quick Jump Index */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24 z-20">
        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Hash className="w-3 h-3" />
          <span>Quick Index</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(groupedTerms).sort().map((letter) => (
            <button
              key={letter}
              onClick={() => {
                document.getElementById(`section-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg
                          bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600
                          dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400
                          transition-all cursor-pointer"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Terms List (Accordion Style) */}
      <div className="space-y-12 pb-24">
        {Object.entries(groupedTerms)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter, terms]) => (
            <div key={letter} id={`section-${letter}`} className="scroll-mt-48">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 dark:bg-gray-700 text-white font-bold text-xl shadow-sm border-b-4 border-gray-700 dark:border-gray-900">
                  {letter}
                </span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {terms.map((term) => (
                  <GlossaryItem key={term.term} term={term} />
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
            className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Clear search filter
          </button>
        </div>
      )}
    </div>
  );
}

// Sub-component for individual item to handle open state
import { ChevronDown, ChevronRight } from 'lucide-react';
import { GlossaryTerm } from '../../data/glossary';

function GlossaryItem({ term }: { term: GlossaryTerm }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`
      group bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200
      ${isOpen
        ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-md'
        : 'border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-sm'
      }
    `}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className={`
            p-2 rounded-lg transition-colors
            ${isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-400 group-hover:text-emerald-600 group-hover:bg-emerald-50'}
          `}>
            {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
          <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald-900 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-100'}`}>
            {term.term}
          </h3>
        </div>
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <div className="hidden sm:flex items-center gap-2">
            {term.relatedTerms.slice(0, 2).map((t, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                {t}
              </span>
            ))}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pl-[4.5rem] animate-in slide-in-from-top-2 duration-200">
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
            {term.definition}
          </p>

          {term.example && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700/50">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 block">
                Example
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                "{term.example}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
