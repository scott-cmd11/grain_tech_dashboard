import { Building, Database, BrainCircuit, Scale, History } from 'lucide-react';
import type { TabId } from '../../types';

export function AboutTab({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const exploreLinks = [
    { id: 'ai-landscape' as TabId, icon: Building, label: 'Companies', color: 'text-emerald-500' },
    { id: 'datasets' as TabId, icon: Database, label: 'Datasets', color: 'text-amber-500' },
    { id: 'research' as TabId, icon: BrainCircuit, label: 'Research', color: 'text-blue-500' },
    { id: 'regulations' as TabId, icon: Scale, label: 'Regulations', color: 'text-orange-500' },
    { id: 'history' as TabId, icon: History, label: 'History', color: 'text-violet-500' },
  ];

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Intro + Explore combined */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-white/5 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          About
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
          This is a personal vibecoding project tracking grain quality tech—companies building solutions,
          research, datasets, and industry trends. I built it to explore how AI and digital tools are changing
          grain inspection while experimenting with vibecoding tools.
        </p>

        {/* Compact Explore Links */}
        <div className="flex flex-wrap gap-2">
          {exploreLinks.map(({ id, icon: Icon, label, color }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200/80 dark:hover:bg-white/10 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <Icon className={`w-4 h-4 ${color}`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-white/5 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Built with</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          React, TypeScript, Tailwind CSS, Vite, Leaflet, and Recharts. Built with help from Claude Code, Google Antigravity, and ChatGPT Codex.
        </p>
      </div>
    </div>
  );
}
