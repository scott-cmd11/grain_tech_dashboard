import { useState } from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

export interface FilterOption {
    key: string;
    label: string;
    group?: string;
}

interface FilterBarProps {
    filters: FilterOption[];
    activeFilters: Set<string>;
    onToggle: (key: string) => void;
    onClearAll: () => void;
    className?: string;
}

export function FilterBar({ filters, activeFilters, onToggle, onClearAll, className = '' }: FilterBarProps) {
    const [expanded, setExpanded] = useState(false);
    const hasActive = activeFilters.size > 0;

    // Group filters by group name
    const groups = filters.reduce<Record<string, FilterOption[]>>((acc, f) => {
        const group = f.group || 'Filters';
        if (!acc[group]) acc[group] = [];
        acc[group].push(f);
        return acc;
    }, {});

    return (
        <div className={`${className}`}>
            {/* Collapsed bar */}
            <div className="flex items-center gap-2 flex-wrap">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-ring
            ${expanded
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filters
                    {hasActive && (
                        <span className="ml-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full min-w-[18px] text-center">
                            {activeFilters.size}
                        </span>
                    )}
                </button>

                {/* Active filter pills (always visible) */}
                {hasActive && !expanded && (
                    <>
                        {Array.from(activeFilters).map(key => {
                            const filter = filters.find(f => f.key === key);
                            if (!filter) return null;
                            return (
                                <button
                                    key={key}
                                    onClick={() => onToggle(key)}
                                    className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-xs font-medium
                    bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300
                    border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40
                    transition-colors focus-ring"
                                >
                                    {filter.label}
                                    <X className="w-3 h-3 opacity-60 hover:opacity-100" />
                                </button>
                            );
                        })}
                        <button
                            onClick={onClearAll}
                            className="inline-flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus-ring rounded-lg"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Clear
                        </button>
                    </>
                )}
            </div>

            {/* Expanded filter panel */}
            {expanded && (
                <div className="mt-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 shadow-lg animate-fade-up">
                    {Object.entries(groups).map(([group, options]) => (
                        <div key={group} className="mb-4 last:mb-0">
                            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                                {group}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {options.map(option => {
                                    const isActive = activeFilters.has(option.key);
                                    return (
                                        <button
                                            key={option.key}
                                            onClick={() => onToggle(option.key)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-ring
                        ${isActive
                                                    ? 'bg-emerald-500 text-white shadow-md'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {hasActive && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                            <button
                                onClick={onClearAll}
                                className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 font-medium flex items-center gap-1 focus-ring rounded-lg px-2 py-1"
                            >
                                <RotateCcw className="w-3 h-3" />
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FilterBar;
