import { X } from 'lucide-react';
import { TabNav } from '../index';
import type { TabId } from '../../types';

interface SidebarProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
    sidebarOpen: boolean;
    onSidebarToggle: () => void;
}

export function Sidebar({ activeTab, onTabChange, sidebarOpen, onSidebarToggle }: SidebarProps) {
    return (
        <>
            {/* Desktop Sidebar - Premium Editorial Glass Style */}
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
            >
                <div className="p-5 space-y-2">
                    <TabNav activeTab={activeTab} onTabChange={onTabChange} />
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={onSidebarToggle}
                />

                {/* Sidebar Panel */}
                <aside
                    className={`
                        absolute inset-y-0 left-0 w-80 max-w-[85vw] 
                        bg-white/95 dark:bg-zinc-900/95 
                        backdrop-blur-2xl
                        shadow-2xl shadow-black/20
                        transition-transform duration-300 ease-out-expo
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className="p-6 space-y-4 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-200/50 dark:border-white/10">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                                Navigation
                            </h2>
                            <button
                                onClick={onSidebarToggle}
                                className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex-1 overflow-y-auto -mx-2 px-2">
                            <TabNav
                                activeTab={activeTab}
                                onTabChange={(tab) => {
                                    onTabChange(tab);
                                    onSidebarToggle();
                                }}
                            />
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}
