import { Building, Database, BrainCircuit, Scale, History } from 'lucide-react';
import type { TabId } from '../../types';

export function AboutTab({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  // Test deployment trigger
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Intro */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-heading-2 font-bold text-gray-900 dark:text-gray-100 mb-3">
          About
        </h2>
        <p className="text-body-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          This is a personal vibecoding project tracking grain quality tech—companies building solutions,
          research, datasets, and industry trends. I built it to explore how AI and digital tools are changing
          grain inspection while learning React and TypeScript.
        </p>
      </div>

      {/* What's tracked */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-heading-3 font-bold text-gray-900 dark:text-gray-100 mb-4">Explore</h3>
        <div className="space-y-2">
          <button
            onClick={() => onNavigate('ai-landscape')}
            className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <Building className="w-5 h-5 text-growth-green flex-shrink-0" />
            <span className="text-body-sm">Companies</span>
          </button>
          <button
            onClick={() => onNavigate('datasets')}
            className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <Database className="w-5 h-5 text-grain-gold flex-shrink-0" />
            <span className="text-body-sm">Datasets</span>
          </button>
          <button
            onClick={() => onNavigate('research')}
            className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <BrainCircuit className="w-5 h-5 text-sky-blue flex-shrink-0" />
            <span className="text-body-sm">Research</span>
          </button>
          <button
            onClick={() => onNavigate('regulations')}
            className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <Scale className="w-5 h-5 text-soil-brown flex-shrink-0" />
            <span className="text-body-sm">Regulations</span>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <History className="w-5 h-5 text-growth-green flex-shrink-0" />
            <span className="text-body-sm">History</span>
          </button>
        </div>
      </div>

      {/* Tech stack */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-heading-3 font-bold text-gray-900 dark:text-gray-100 mb-4">Built with</h3>
        <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-3">
          React, TypeScript, Tailwind CSS, Vite, Leaflet, and Recharts.
        </p>
        <p className="text-body-sm text-gray-600 dark:text-gray-400">
          Built with help from Claude Code, Google Antigravity, and ChatGPT Codex.
        </p>
      </div>
    </div>
  );
}
