import React, { memo, useCallback } from 'react';
import {
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
} from 'lucide-react';
import type { TabId, TabConfig } from '../types';

interface TabGroup {
  title: string;
  tabs: TabConfig[];
}

const groupedTabs: TabGroup[] = [
  {
    title: 'Overview',
    tabs: [
      { id: 'about', label: 'About', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'glossary', label: 'Glossary', icon: <HelpCircle className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Market Intelligence',
    tabs: [
      { id: 'ai-landscape', label: 'Landscape', icon: <Globe className="w-4 h-4" /> },
      { id: 'news', label: 'News', icon: <Newspaper className="w-4 h-4" /> },
      { id: 'timeline', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
      { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Analysis',
    tabs: [
      { id: 'insights', label: 'Analytics', icon: <PieChart className="w-4 h-4" /> },
      { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
      { id: 'regulations', label: 'Regulations', icon: <Scale className="w-4 h-4" /> },
      { id: 'scenarios', label: 'Scenarios', icon: <Wand2 className="w-4 h-4" /> },
      { id: 'research', label: 'AI Progress', icon: <BrainCircuit className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Reference & Data',
    tabs: [
      { id: 'datasets', label: 'Datasets', icon: <Database className="w-4 h-4" /> },
      { id: 'github-repos', label: 'Github Repos', icon: <Github className="w-4 h-4" /> },
      { id: 'research-papers', label: 'Research Papers', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
];

const allTabs = groupedTabs.flatMap(group => group.tabs);

interface TabNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const TabNav = memo(function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;

      if (e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % allTabs.length;
      } else if (e.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
      } else if (e.key === 'Home') {
        newIndex = 0;
      } else if (e.key === 'End') {
        newIndex = allTabs.length - 1;
      } else {
        return;
      }

      e.preventDefault();
      onTabChange(allTabs[newIndex].id);
    },
    [onTabChange]
  );

  return (
    <nav
      className="w-full"
      aria-label="Main navigation"
    >
      <div
        className="flex flex-col gap-0.5 overflow-visible"
        role="tablist"
        aria-label="Dashboard sections"
      >
        {groupedTabs.map((group) => (
          <div key={group.title} className="flex flex-col shrink-0 mb-4 last:mb-0">
            {/* Section Title */}
            <h3 className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {group.title}
            </h3>

            {/* Tab Buttons */}
            {group.tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const globalIndex = allTabs.findIndex(t => t.id === tab.id);

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, globalIndex)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  className={`
                    group flex items-center gap-2.5 
                    px-3 py-2 rounded-md
                    font-medium text-sm
                    transition-colors duration-150
                    whitespace-nowrap
                    focus-ring
                    justify-start w-full
                    ${isActive
                      ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                    }
                  `}
                >
                  {/* Icon */}
                  <span className={`${isActive ? 'text-accent-600 dark:text-accent-400' : ''}`}>
                    {tab.icon}
                  </span>

                  {/* Label */}
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
});

export default TabNav;
