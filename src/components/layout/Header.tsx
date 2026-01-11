import { Cpu, Sun, Moon, Printer, Search, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUrlState } from '../../hooks/useUrlState';
import { ShareButton } from '../ShareButton';
import { getDenormalizedSolutions } from '../../utils/dataNormalization';
import { datasetsData } from '../../data';

interface HeaderProps {
  onSearchChange?: (term: string) => void;
  searchTerm?: string;
  onSidebarToggle?: () => void;
}

export function Header({ onSearchChange, searchTerm, onSidebarToggle }: HeaderProps) {
  const { toggleTheme, isDark } = useTheme();
  const { getShareableUrl } = useUrlState();
  const solutionsCount = getDenormalizedSolutions().length;

  return (
    <header className="relative overflow-hidden no-print">
      {/* Gradient background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-700 dark:via-teal-600 dark:to-cyan-600" />

      {/* Glass overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1 w-full flex items-start gap-4">
              {/* Mobile Hamburger */}
              <button
                onClick={onSidebarToggle}
                className="lg:hidden p-2 -ml-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/15 backdrop-blur-sm rounded-xl">
                    <Cpu className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    GrainTech Intelligence
                  </h1>
                </div>
                <p className="text-white/80 text-sm sm:text-base max-w-xl font-medium">
                  A vibecoding project exploring how grain quality checks are going digital
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
                  <span className="hidden sm:inline-flex items-center px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold text-white/90">
                    {solutionsCount} Solutions
                  </span>
                  <span className="hidden sm:inline-flex items-center px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold text-white/90">
                    {datasetsData.length} Datasets
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold text-white/90">
                    🌍 Global Coverage
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch lg:items-center gap-3 w-full lg:w-auto">
              {/* Global Search */}
              <div className="relative flex-1 sm:min-w-[260px]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search solutions, companies..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-sm bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all duration-200"
                  aria-label="Search"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Share Button */}
                <ShareButton url={getShareableUrl({})} title="GrainTech Intelligence Dashboard" />

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                  title="Print"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only header */}
      <div className="print-header print-only">
        <h1>GrainTech Intelligence Dashboard</h1>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </header>
  );
}
