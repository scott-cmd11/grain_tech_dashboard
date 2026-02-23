import { Building, Database, BrainCircuit, Scale, History, ArrowRight } from 'lucide-react';
import type { TabId } from '../../types';
import { Card } from '../Card';

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
      {/* Bento Grid - Explore Links */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Explore the <span className="text-gold-accent">Landscape</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exploreLinks.map(({ id, icon: Icon, label, description, color }, index) => (
            <Card
              key={id}
              variant="default"
              hover="lift"
              as="button"
              onClick={() => onNavigate(id)}
              className="p-6 text-left group"
              animated
              staggerIndex={index + 1}
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
            </Card>
          ))}
        </div>
      </div>

      {/* Built With */}
      <Card variant="default" hover="none" className="p-6 sm:p-8" animated staggerIndex={6}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="text-gold-accent">◆</span> Built With
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          React, TypeScript, Tailwind CSS, Vite, Google Maps, and Recharts.
          <span className="text-emerald-600 dark:text-emerald-400 ml-1">
            Crafted with AI assistance from Claude, Antigravity, and ChatGPT.
          </span>
        </p>
      </Card>
    </div>
  );
}
