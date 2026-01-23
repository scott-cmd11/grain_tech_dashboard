import { Building, Database, BrainCircuit, Scale, History, ArrowRight, Sparkles } from 'lucide-react';
import type { TabId } from '../../types';

export function AboutTab({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const exploreLinks = [
    { id: 'ai-landscape' as TabId, icon: Building, label: 'Companies', description: 'Explore innovative solutions', color: 'from-emerald-500 to-teal-500' },
    { id: 'datasets' as TabId, icon: Database, label: 'Datasets', description: 'Training data & resources', color: 'from-amber-500 to-orange-500' },
    { id: 'research' as TabId, icon: BrainCircuit, label: 'Research', description: 'Latest publications', color: 'from-blue-500 to-indigo-500' },
    { id: 'regulations' as TabId, icon: Scale, label: 'Regulations', description: 'Global compliance', color: 'from-orange-500 to-red-500' },
    { id: 'history' as TabId, icon: History, label: 'History', description: 'Industry evolution', color: 'from-violet-500 to-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero Card - Massive Editorial Typography */}
      <div className="card-editorial p-8 sm:p-10 lg:p-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lift">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-grain-heritage-500 uppercase tracking-widest mb-2">
              Welcome to
            </p>
            <h1 className="text-editorial-title text-gray-900 dark:text-white">
              GrainTech <span className="text-gold-accent">Intelligence</span>
            </h1>
          </div>
        </div>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
          A personal project tracking the digital transformation of grain quality analysis.
          Discover how <span className="text-emerald-600 dark:text-emerald-400 font-medium">AI and automation</span> are
          revolutionizing an industry that feeds the world.
        </p>

        {/* Stat Pills */}
        <div className="flex flex-wrap gap-4">
          <div className="px-5 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100+</span>
            <span className="text-sm text-emerald-700 dark:text-emerald-300 ml-2">Solutions Tracked</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">Global</span>
            <span className="text-sm text-amber-700 dark:text-amber-300 ml-2">Coverage</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">AI</span>
            <span className="text-sm text-blue-700 dark:text-blue-300 ml-2">Powered Insights</span>
          </div>
        </div>
      </div>

      {/* Bento Grid - Explore Links */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Explore the <span className="text-gold-accent">Landscape</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exploreLinks.map(({ id, icon: Icon, label, description, color }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="group card-editorial p-6 text-left hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                {label}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Built With - Compact Premium Card */}
      <div className="card-editorial p-6 sm:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="text-gold-accent">◆</span> Built With
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          React, TypeScript, Tailwind CSS, Vite, Google Maps, and Recharts.
          <span className="text-emerald-600 dark:text-emerald-400 ml-1">
            Crafted with AI assistance from Claude, Antigravity, and ChatGPT.
          </span>
        </p>
      </div>
    </div>
  );
}
