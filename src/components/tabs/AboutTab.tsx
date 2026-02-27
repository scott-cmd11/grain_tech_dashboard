import { Building, Database, BrainCircuit, Scale, History, ArrowRight } from 'lucide-react';
import type { TabId } from '../../types';
import { PageHeader } from '../ui';

export function AboutTab({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const exploreLinks = [
    { id: 'ai-landscape' as TabId, icon: Building, label: 'Companies', description: 'Explore AI grain quality solutions' },
    { id: 'datasets' as TabId, icon: Database, label: 'Datasets', description: 'Training data & research resources' },
    { id: 'research' as TabId, icon: BrainCircuit, label: 'Research', description: 'Latest AI progress & publications' },
    { id: 'regulations' as TabId, icon: Scale, label: 'Regulations', description: 'Global compliance landscape' },
    { id: 'history' as TabId, icon: History, label: 'History', description: 'Industry evolution timeline' },
  ];

  return (
    <div className="section-gap">
      <PageHeader
        title="GrainTech Intelligence"
        description="How grain quality checks are going digital — tracking companies, research, and regulations across the global grain inspection industry."
      />

      {/* Navigation grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {exploreLinks.map(({ id, icon: Icon, label, description }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="group flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-150 text-left focus-ring"
          >
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md shrink-0">
              <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-1.5">
                {label}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 text-zinc-400" />
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
