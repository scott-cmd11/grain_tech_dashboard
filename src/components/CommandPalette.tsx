import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
    Search,
    Command,
    ArrowRight,
    PieChart,
    Database,
    BrainCircuit,
    Scale,
    History,
    TrendingUp,
    Newspaper,
    Globe,
    Calendar,
    Wand2,
    Github,
    BookOpen,
    HelpCircle,
    Moon,
    Sun,
    Building,
    Clock,
} from 'lucide-react';
import type { TabId } from '../types';
import { useTheme } from '../context/ThemeContext';
import { companiesData, datasetsData } from '../data';
import { glossaryTerms } from '../data/glossary';

// Search result types
interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon: React.ReactNode;
    action: () => void;
    category: string;
    keywords?: string[];
}

interface CommandPaletteProps {
    onTabChange: (tab: TabId) => void;
    currentTab: TabId;
}

const RECENT_SEARCHES_KEY = 'graintech-recent-searches';
const MAX_RECENT_SEARCHES = 5;
const MAX_RESULTS_PER_CATEGORY = 5;

function getRecentSearches(): string[] {
    try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveRecentSearch(term: string) {
    try {
        const recent = getRecentSearches().filter(s => s !== term);
        recent.unshift(term);
        localStorage.setItem(
            RECENT_SEARCHES_KEY,
            JSON.stringify(recent.slice(0, MAX_RECENT_SEARCHES))
        );
    } catch {
        // localStorage unavailable
    }
}

export function CommandPalette({ onTabChange, currentTab }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const { theme, toggleTheme } = useTheme();

    // Navigation commands
    const navigationCommands: CommandItem[] = useMemo(() => [
        {
            id: 'nav-about', label: 'About', description: 'Introduction and overview',
            icon: <BookOpen className="w-4 h-4" />,
            action: () => { onTabChange('about'); setIsOpen(false); },
            category: 'Navigation', keywords: ['home', 'intro', 'start'],
        },
        {
            id: 'nav-glossary', label: 'Glossary', description: 'Terminology and definitions',
            icon: <HelpCircle className="w-4 h-4" />,
            action: () => { onTabChange('glossary'); setIsOpen(false); },
            category: 'Navigation', keywords: ['terms', 'definitions', 'dictionary'],
        },
        {
            id: 'nav-landscape', label: 'AI Landscape', description: 'Companies and technologies',
            icon: <Globe className="w-4 h-4" />,
            action: () => { onTabChange('ai-landscape'); setIsOpen(false); },
            category: 'Navigation', keywords: ['companies', 'map', 'vendors'],
        },
        {
            id: 'nav-news', label: 'News', description: 'Latest industry news',
            icon: <Newspaper className="w-4 h-4" />,
            action: () => { onTabChange('news'); setIsOpen(false); },
            category: 'Navigation', keywords: ['articles', 'updates', 'feed'],
        },
        {
            id: 'nav-timeline', label: 'Timeline', description: 'Technology adoption timeline',
            icon: <Calendar className="w-4 h-4" />,
            action: () => { onTabChange('timeline'); setIsOpen(false); },
            category: 'Navigation', keywords: ['history', 'dates', 'milestones'],
        },
        {
            id: 'nav-trends', label: 'Trends', description: 'Industry trends and insights',
            icon: <TrendingUp className="w-4 h-4" />,
            action: () => { onTabChange('trends'); setIsOpen(false); },
            category: 'Navigation', keywords: ['insights', 'analysis', 'market'],
        },
        {
            id: 'nav-analytics', label: 'Analytics', description: 'Charts and statistics',
            icon: <PieChart className="w-4 h-4" />,
            action: () => { onTabChange('insights'); setIsOpen(false); },
            category: 'Navigation', keywords: ['charts', 'stats', 'data'],
        },
        {
            id: 'nav-history', label: 'History', description: 'Evolution of grain grading',
            icon: <History className="w-4 h-4" />,
            action: () => { onTabChange('history'); setIsOpen(false); },
            category: 'Navigation', keywords: ['past', 'evolution', 'legacy'],
        },
        {
            id: 'nav-regulations', label: 'Regulations', description: 'Regulatory landscape',
            icon: <Scale className="w-4 h-4" />,
            action: () => { onTabChange('regulations'); setIsOpen(false); },
            category: 'Navigation', keywords: ['laws', 'compliance', 'standards'],
        },
        {
            id: 'nav-scenarios', label: 'Scenario Explorer', description: 'Model adoption scenarios',
            icon: <Wand2 className="w-4 h-4" />,
            action: () => { onTabChange('scenarios'); setIsOpen(false); },
            category: 'Navigation', keywords: ['model', 'predict', 'simulation'],
        },
        {
            id: 'nav-research', label: 'AI Progress', description: 'AI research and algorithms',
            icon: <BrainCircuit className="w-4 h-4" />,
            action: () => { onTabChange('research'); setIsOpen(false); },
            category: 'Navigation', keywords: ['ai', 'ml', 'algorithms'],
        },
        {
            id: 'nav-datasets', label: 'Datasets', description: 'Training data resources',
            icon: <Database className="w-4 h-4" />,
            action: () => { onTabChange('datasets'); setIsOpen(false); },
            category: 'Navigation', keywords: ['data', 'training', 'images'],
        },
        {
            id: 'nav-github', label: 'GitHub Repos', description: 'Open source projects',
            icon: <Github className="w-4 h-4" />,
            action: () => { onTabChange('github-repos'); setIsOpen(false); },
            category: 'Navigation', keywords: ['code', 'opensource', 'projects'],
        },
        {
            id: 'nav-papers', label: 'Research Papers', description: 'Academic publications',
            icon: <BookOpen className="w-4 h-4" />,
            action: () => { onTabChange('research-papers'); setIsOpen(false); },
            category: 'Navigation', keywords: ['papers', 'academic', 'publications'],
        },
        // Actions
        {
            id: 'action-theme',
            label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
            description: 'Toggle color theme',
            icon: theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
            action: () => { toggleTheme(); setIsOpen(false); },
            category: 'Actions', keywords: ['theme', 'dark', 'light', 'mode'],
        },
    ], [onTabChange, theme, toggleTheme]);

    // Generate searchable data commands from real data
    const dataCommands: CommandItem[] = useMemo(() => {
        const cmds: CommandItem[] = [];

        // Companies
        companiesData.forEach((company) => {
            cmds.push({
                id: `company-${company.id}`,
                label: company.name,
                description: `${company.product} · ${company.country}`,
                icon: <Building className="w-4 h-4" />,
                action: () => { onTabChange('ai-landscape'); setIsOpen(false); },
                category: 'Companies',
                keywords: [company.country, company.type, company.tech, ...company.crops].filter(Boolean),
            });
        });

        // Datasets
        datasetsData.forEach((ds, i) => {
            cmds.push({
                id: `dataset-${i}`,
                label: ds.name,
                description: `${ds.images} images · ${ds.crops.join(', ') || 'Multi-crop'}`,
                icon: <Database className="w-4 h-4" />,
                action: () => { onTabChange('datasets'); setIsOpen(false); },
                category: 'Datasets',
                keywords: [...ds.crops, ...ds.tasks, ds.source].filter(Boolean),
            });
        });

        // Glossary
        glossaryTerms.forEach((term, i) => {
            cmds.push({
                id: `glossary-${i}`,
                label: term.term,
                description: term.definition.slice(0, 80) + (term.definition.length > 80 ? '…' : ''),
                icon: <HelpCircle className="w-4 h-4" />,
                action: () => { onTabChange('glossary'); setIsOpen(false); },
                category: 'Glossary',
                keywords: term.relatedTerms || [],
            });
        });

        return cmds;
    }, [onTabChange]);

    const allCommands = useMemo(() => [...navigationCommands, ...dataCommands], [navigationCommands, dataCommands]);

    // Filter commands based on search term
    const filteredCommands = useMemo(() => {
        if (!searchTerm.trim()) return navigationCommands;

        const search = searchTerm.toLowerCase();
        return allCommands.filter(cmd =>
            cmd.label.toLowerCase().includes(search) ||
            cmd.description?.toLowerCase().includes(search) ||
            cmd.keywords?.some(kw => kw.toLowerCase().includes(search))
        );
    }, [allCommands, navigationCommands, searchTerm]);

    // Group filtered commands by category with result counts
    const groupedCommands = useMemo(() => {
        const groups: Record<string, { items: CommandItem[]; total: number }> = {};
        filteredCommands.forEach(cmd => {
            if (!groups[cmd.category]) groups[cmd.category] = { items: [], total: 0 };
            groups[cmd.category].total++;
            if (groups[cmd.category].items.length < MAX_RESULTS_PER_CATEGORY) {
                groups[cmd.category].items.push(cmd);
            }
        });
        return groups;
    }, [filteredCommands]);

    // Flat list for keyboard navigation (only items shown)
    const visibleCommands = useMemo(() => {
        return Object.values(groupedCommands).flatMap(g => g.items);
    }, [groupedCommands]);

    // Reset selection when filtered results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchTerm]);

    // Keyboard shortcut to open palette
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setSearchTerm('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < visibleCommands.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev > 0 ? prev - 1 : visibleCommands.length - 1
            );
        } else if (e.key === 'Enter' && visibleCommands[selectedIndex]) {
            e.preventDefault();
            if (searchTerm.trim()) saveRecentSearch(searchTerm.trim());
            visibleCommands[selectedIndex].action();
        }
    }, [visibleCommands, selectedIndex, searchTerm]);

    // Scroll selected item into view
    useEffect(() => {
        const selectedElement = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
        selectedElement?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex]);

    // Recent searches for empty state
    const recentSearches = useMemo(() => isOpen ? getRecentSearches() : [], [isOpen]);

    if (!isOpen) return null;

    let visibleIndex = 0;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                <div
                    className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden pointer-events-auto animate-scale-up"
                    role="dialog"
                    aria-label="Command palette"
                    aria-modal="true"
                >
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                        <Search className="w-5 h-5 text-gray-400 shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search commands, companies, datasets, glossary..."
                            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none text-base"
                            aria-label="Search all dashboard content"
                        />
                        <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] font-mono">ESC</kbd>
                            <span>to close</span>
                        </div>
                    </div>

                    {/* Commands List */}
                    <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
                        {visibleCommands.length === 0 && !searchTerm.trim() && recentSearches.length > 0 ? (
                            // Recent searches
                            <div className="mb-3">
                                <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                    Recent
                                </div>
                                {recentSearches.map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => setSearchTerm(term)}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm">{term}</span>
                                    </button>
                                ))}
                            </div>
                        ) : visibleCommands.length === 0 ? (
                            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No results found</p>
                            </div>
                        ) : (
                            Object.entries(groupedCommands).map(([category, { items, total }]) => {
                                const sectionStart = visibleIndex;
                                return (
                                    <div key={category} className="mb-3 last:mb-0">
                                        <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center justify-between">
                                            <span>{category}</span>
                                            {searchTerm.trim() && (
                                                <span className="text-[10px] font-normal text-gray-400">
                                                    {total > MAX_RESULTS_PER_CATEGORY ? `${MAX_RESULTS_PER_CATEGORY} of ${total}` : `${total}`}
                                                </span>
                                            )}
                                        </div>
                                        {items.map((cmd) => {
                                            const idx = visibleIndex++;
                                            const isSelected = idx === selectedIndex;
                                            const isCurrentTab = cmd.id.startsWith('nav-') &&
                                                (cmd.id === `nav-${currentTab}` ||
                                                    (cmd.id === 'nav-landscape' && currentTab === 'ai-landscape') ||
                                                    (cmd.id === 'nav-analytics' && currentTab === 'insights'));

                                            return (
                                                <button
                                                    key={cmd.id}
                                                    data-index={idx}
                                                    onClick={() => {
                                                        if (searchTerm.trim()) saveRecentSearch(searchTerm.trim());
                                                        cmd.action();
                                                    }}
                                                    onMouseEnter={() => setSelectedIndex(sectionStart + items.indexOf(cmd))}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                          ${isSelected
                                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <span className={`shrink-0 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                                                        {cmd.icon}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium truncate">{cmd.label}</span>
                                                            {isCurrentTab && (
                                                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded shrink-0">
                                                                    Current
                                                                </span>
                                                            )}
                                                        </div>
                                                        {cmd.description && (
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                                {cmd.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {isSelected && (
                                                        <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                        {/* Show overflow indicator */}
                                        {total > MAX_RESULTS_PER_CATEGORY && searchTerm.trim() && (
                                            <div className="px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium cursor-default">
                                                +{total - MAX_RESULTS_PER_CATEGORY} more results
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-[10px] font-mono shadow-sm">↑</kbd>
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-[10px] font-mono shadow-sm">↓</kbd>
                                    <span className="ml-1">Navigate</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-[10px] font-mono shadow-sm">↵</kbd>
                                    <span className="ml-1">Select</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Command className="w-3 h-3" />
                                <span>+</span>
                                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-[10px] font-mono shadow-sm">K</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommandPalette;
