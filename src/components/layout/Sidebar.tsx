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
                    ${sidebarOpen ? 'w-72' : 'w-0'} 
                    shrink-0 overflow-y-auto overflow-x-hidden
                    bg-white/70 dark:bg-zinc-900/70 
                    backdrop-blur-2xl
                    border-r border-gray-200/60 dark:border-white/5
                    shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]
                    dark:shadow-[4px_0_24px_-12px_rgba(0,0,0,0.3)]
                    transition-all duration-300 ease-out-expo
                    lg:flex flex-col hidden
                `}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="p-5 space-y-2">
                    <TabNav activeTab={activeTab} onTabChange={onTabChange} />
                </div>
            </aside>

            {/* ============= MOBILE BOTTOM TAB BAR ============= */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 z-[50] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-gray-200/60 dark:border-white/10 pb-[env(safe-area-inset-bottom,0px)]"
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
                                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px] focus-ring
                                    ${isActive
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                                    {tab.icon}
                                </span>
                                <span className={`text-[10px] font-medium ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                                    {tab.label}
                                </span>
                                {isActive && (
                                    <span className="absolute -top-0.5 w-6 h-0.5 rounded-full bg-emerald-500" />
                                )}
                            </button>
                        );
                    })}
                    {/* More button opens full navigation */}
                    <button
                        onClick={() => setMoreOpen(true)}
                        className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px] focus-ring
                            ${!BOTTOM_TABS.some(t => t.id === activeTab)
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        <MoreHorizontal className="w-5 h-5" />
                        <span className="text-[10px] font-medium">More</span>
                    </button>
                </div>
            </nav>

            {/* ============= MOBILE "MORE" FULL NAV OVERLAY ============= */}
            <div
                className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${moreOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setMoreOpen(false)}
                />

                {/* Bottom sheet panel */}
                <aside
                    className={`
                        absolute bottom-0 left-0 right-0 
                        max-h-[80vh] rounded-t-3xl
                        bg-white/95 dark:bg-zinc-900/95 
                        backdrop-blur-2xl
                        shadow-2xl shadow-black/20
                        transition-transform duration-300 ease-out-expo
                        ${moreOpen ? 'translate-y-0' : 'translate-y-full'}
                    `}
                >
                    {/* Drag handle */}
                    <div className="flex justify-center pt-3 pb-1">
                        <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    </div>

                    <div className="p-6 space-y-4 flex flex-col overflow-y-auto max-h-[calc(80vh-40px)]">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-200/50 dark:border-white/10">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                                All Sections
                            </h2>
                            <button
                                onClick={() => setMoreOpen(false)}
                                className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all duration-200 focus-ring"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Full Navigation */}
                        <div className="flex-1 overflow-y-auto -mx-2 px-2">
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
