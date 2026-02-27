import { Sun, Moon, Menu, Wheat } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { getDenormalizedSolutions } from '../../utils/dataNormalization';
import { datasetsData } from '../../data';

interface HeaderProps {
  onSidebarToggle?: () => void;
}

export function Header({ onSidebarToggle }: HeaderProps) {
  const { toggleTheme, isDark } = useTheme();
  const solutionsCount = getDenormalizedSolutions().length;

  return (
    <header className="no-print bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: hamburger + brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSidebarToggle}
              className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg focus-ring"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-50 dark:bg-accent-900/30 rounded-lg">
                <Wheat className="w-5 h-5 text-accent-600 dark:text-accent-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
                  GrainTech
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                  Grain quality intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Center: stats (desktop only) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <span className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">{solutionsCount}</span>
              <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Solutions</span>
            </div>
            <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />
            <div className="text-center">
              <span className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">{datasetsData.length}</span>
              <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Datasets</span>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-ring"
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Print-only header */}
      <div className="print-only">
        <h1>GrainTech Intelligence Dashboard</h1>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </header>
  );
}
