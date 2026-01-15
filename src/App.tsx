import { useState, useMemo, useCallback, useEffect } from 'react';

// Types
import type { TabId } from './types';

// Context
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Hooks
import { useUrlState } from './hooks/useUrlState';

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

// Main Dashboard Component
function Dashboard() {
  const { getStateFromUrl, setUrlState } = useUrlState();

  // Initialize state from URL
  const urlState = getStateFromUrl();

  // Global State
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (urlState.tab === 'landscape' || urlState.tab === 'tech-stack') {
      return 'ai-landscape';
    }
    return (urlState.tab as TabId) || 'about';
  });
  const [searchTerm, setSearchTerm] = useState(urlState.search || '');
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [companiesOpen, setCompaniesOpen] = useState(() => urlState.companiesOpen !== false);
  const [expandedDataset, setExpandedDataset] = useState<number | null>(null);

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
    <div className="min-h-screen app-shell transition-colors duration-300 flex flex-col">
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
