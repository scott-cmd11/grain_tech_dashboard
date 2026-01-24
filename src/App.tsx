import { useState, useMemo, useCallback, useEffect } from 'react';

// Types
import type { TabId } from './types';

// Context
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Hooks
import { useUrlState } from './hooks/useUrlState';
import { usePreferences } from './hooks/usePreferences';

// Components
import { ToastContainer } from './components/Toast';

// Components
import { Header, Sidebar } from './components/layout';
import {
  LandscapeTab,
  AnalyticsTab,
  ResearchTab,
  RegulationsTab,
  HistoryTab,
  DatasetsTab,
  TimelineTab,
  ScenariosTab,
  AboutTab,
  GlossaryTab,
  TrendsPage,
  NewsTab,
  GithubTab,
  ResearchPapersTab,
} from './components/tabs';
import { ChatWidget } from './components/Chat/ChatWidget';
import { CommandPalette } from './components/CommandPalette';
import { ShortcutsModal } from './components/ShortcutsModal';

// Main Dashboard Component
function Dashboard() {
  const { getStateFromUrl, setUrlState } = useUrlState();
  const { setLastVisitedTab } = usePreferences();

  // Initialize state from URL
  const urlState = getStateFromUrl();

  // State for shortcuts modal
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Global State
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (urlState.tab === 'landscape' || urlState.tab === 'tech-stack') {
      return 'ai-landscape';
    }
    return (urlState.tab as TabId) || 'about';
  });
  const [searchTerm, _setSearchTerm] = useState(urlState.search || '');
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [companiesOpen, setCompaniesOpen] = useState(() => urlState.companiesOpen !== false);
  const [expandedDataset, setExpandedDataset] = useState<number | null>(null);

  // Track tab changes in preferences
  useEffect(() => {
    setLastVisitedTab(activeTab);
  }, [activeTab, setLastVisitedTab]);

  // Keyboard shortcut: ? to show shortcuts modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '?') {
        e.preventDefault();
        setShortcutsOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update URL when state changes
  useEffect(() => {
    setUrlState({
      tab: activeTab,
      companiesOpen,
      search: searchTerm,
    });
  }, [activeTab, setUrlState, companiesOpen, searchTerm]);

  // Scroll to top when tab changes
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [activeTab]);

  const handleToggleDataset = useCallback((index: number) => {
    setExpandedDataset((prev) => (prev === index ? null : index));
  }, []);

  // Shared Stats (memoized for child tabs)
  // Uses denormalized grain solutions for stats
  const stats = useMemo(() => {
    // Import dynamically to avoid circular deps - stats are derived from regions not crops
    // For AnalyticsTab compatibility, we provide empty arrays as it handles its own data
    return {
      allCrops: [] as string[],
      allCountries: [] as string[],
      allTypes: [] as string[],
    };
  }, []);

  return (
    <div className="min-h-screen app-shell transition-colors duration-300 flex flex-col overflow-x-hidden">
      <Header
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 pb-24">
          <div className="max-w-6xl mx-auto animate-fade-up">
            {activeTab === 'about' && <AboutTab onNavigate={setActiveTab} />}
            {activeTab === 'glossary' && <GlossaryTab searchTerm={searchTerm} />}
            {activeTab === 'trends' && <TrendsPage />}

            {activeTab === 'ai-landscape' && (
              <LandscapeTab
                companiesOpen={companiesOpen}
                onCompaniesToggle={() => setCompaniesOpen(prev => !prev)}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === 'insights' && (
              <AnalyticsTab
                allCountries={stats.allCountries}
                allCrops={stats.allCrops}
                allTypes={stats.allTypes}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === 'timeline' && <TimelineTab />}
            {activeTab === 'scenarios' && <ScenariosTab />}
            {activeTab === 'datasets' && (
              <DatasetsTab
                expandedDataset={expandedDataset}
                onToggleDataset={handleToggleDataset}
                searchTerm={searchTerm}
              />
            )}
            {activeTab === 'research' && <ResearchTab />}

            {activeTab === 'regulations' && <RegulationsTab />}
            {activeTab === 'history' && <HistoryTab />}
            {activeTab === 'news' && <NewsTab />}
            {activeTab === 'github-repos' && <GithubTab />}
            {activeTab === 'research-papers' && <ResearchPapersTab />}
            {/* AI Disclaimer */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700/50">
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 italic">
                Disclaimer: This website and its content were generated with the assistance of AI. Information may contain errors.
              </p>
            </div>
          </div>
        </main>
      </div>

      <ChatWidget />
      <CommandPalette onTabChange={setActiveTab} currentTab={activeTab} />
      <ShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Dashboard />
        <ToastContainer />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
