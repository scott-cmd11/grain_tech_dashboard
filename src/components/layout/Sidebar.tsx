import { X, BookOpen, TrendingUp, Building, Newspaper, MoreHorizontal } from 'lucide-react';
import { TabNav } from '../index';
import type { TabId } from '../../types';
import { useState } from 'react';

interface SidebarProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
    sidebarOpen: boolean;
    onSidebarToggle: () => void;
}

// Primary tabs shown in mobile bottom bar
const BOTTOM_TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'Home', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'ai-landscape', label: 'Explore', icon: <Building className="w-5 h-5" /> },
    { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'news', label: 'News', icon: <Newspaper className="w-5 h-5" /> },
];

export function Sidebar({ activeTab, onTabChange, sidebarOpen }: SidebarProps) {
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <>
            {/* ============= DESKTOP SIDEBAR ============= */}
            <aside
                className={`
                    ${sidebarOpen ? 'w-60' : 'w-0'} 
                    shrink-0 overflow-y-auto overflow-x-hidden
                    bg-white dark:bg-zinc-900
                    border-r border-zinc-200 dark:border-zinc-800
                    transition-[width] duration-200 ease-out
                    lg:flex flex-col hidden
                `}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="p-4 space-y-1">
                    <TabNav activeTab={activeTab} onTabChange={onTabChange} />
                </div>
            </aside>

            {/* ============= MOBILE BOTTOM TAB BAR ============= */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 z-[50] bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pb-[env(safe-area-inset-bottom,0px)]"
                role="navigation"
                aria-label="Mobile navigation"
            >
                <div className="flex items-center justify-around px-2 py-1">
                    {BOTTOM_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors duration-150 min-w-[60px] focus-ring
                                    ${isActive
                                        ? 'text-accent-600 dark:text-accent-400'
                                        : 'text-zinc-400 dark:text-zinc-500'
                                    }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {tab.icon}
                                <span className={`text-[10px] font-medium ${isActive ? 'text-accent-600 dark:text-accent-400' : ''}`}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                    {/* More button */}
                    <button
                        onClick={() => setMoreOpen(true)}
                        className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors duration-150 min-w-[60px] focus-ring
                            ${!BOTTOM_TABS.some(t => t.id === activeTab)
                                ? 'text-accent-600 dark:text-accent-400'
                                : 'text-zinc-400 dark:text-zinc-500'
                            }`}
                    >
                        <MoreHorizontal className="w-5 h-5" />
                        <span className="text-[10px] font-medium">More</span>
                    </button>
                </div>
            </nav>

            {/* ============= MOBILE "MORE" OVERLAY ============= */}
            <div
                className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${moreOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setMoreOpen(false)}
                />
                <aside
                    className={`
                        absolute bottom-0 left-0 right-0 
                        max-h-[80vh] rounded-t-xl
                        bg-white dark:bg-zinc-900
                        border-t border-zinc-200 dark:border-zinc-800
                        shadow-md
                        transition-transform duration-200 ease-out
                        ${moreOpen ? 'translate-y-0' : 'translate-y-full'}
                    `}
                >
                    <div className="flex justify-center pt-3 pb-1">
                        <div className="w-8 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                    </div>
                    <div className="p-5 space-y-4 flex flex-col overflow-y-auto max-h-[calc(80vh-40px)]">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">All Sections</h2>
                            <button
                                onClick={() => setMoreOpen(false)}
                                className="p-1.5 -mr-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg focus-ring"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto -mx-1 px-1">
                            <TabNav
                                activeTab={activeTab}
                                onTabChange={(tab) => {
                                    onTabChange(tab);
                                    setMoreOpen(false);
                                }}
                            />
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}
