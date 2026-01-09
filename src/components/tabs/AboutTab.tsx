import { BookOpen, Target, Lightbulb, Building, Database, BrainCircuit, Scale, History } from 'lucide-react';
import type { TabId } from '../../types';

export function AboutTab({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-growth-green to-grain-gold" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="shrink-0">
            <div className="w-20 h-20 rounded-lg bg-growth-green/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-growth-green" />
            </div>
          </div>
          <div>
            <h2 className="text-heading-2 font-bold text-gray-900 dark:text-gray-100 mb-2">
              About This Project
            </h2>
            <p className="text-body-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              Hey! This is my personal coding project to learn web development while tracking what's happening
              in the grain technology industry. I'm interested in how digital tools and AI are changing grain
              quality inspection, so I built this dashboard to organize my research and practice React/TypeScript.
              It's a work in progress, but it helps me stay on top of industry trends while building something useful.
            </p>
          </div>
        </div>
      </div>

      {/* Purpose Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-growth-green to-growth-green-dark rounded-xl p-8 text-white shadow-md">
          <Target className="w-10 h-10 mb-6 text-white/80" />
          <h3 className="text-heading-3 font-bold mb-4">Why Grain Tech?</h3>
          <p className="text-body-sm leading-relaxed">
            I find the intersection of agriculture and technology fascinating. Grain quality affects farmer income,
            food production, and global trade. Digital tools are transforming how inspectors assess grain—from manual
            visual checks to AI-powered analysis. It's a niche industry that's evolving fast, and I wanted to map
            the landscape while learning to code.
          </p>
        </div>

        <div className="bg-gradient-to-br from-grain-gold to-grain-gold-dark rounded-xl p-8 text-white shadow-md">
          <Lightbulb className="w-10 h-10 mb-6 text-white/80" />
          <h3 className="text-heading-3 font-bold mb-4">What I'm Tracking</h3>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => onNavigate('ai-landscape')}
                className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <span className="text-body-sm font-medium"><strong>Companies</strong> building grain tech solutions</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('datasets')}
                className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <span className="text-body-sm font-medium"><strong>Public datasets</strong> for training AI models</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('research')}
                className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <BrainCircuit className="w-4 h-4 text-white" />
                </div>
                <span className="text-body-sm font-medium"><strong>Research papers</strong> on computer vision & AI</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('regulations')}
                className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <span className="text-body-sm font-medium"><strong>Regulations</strong> enabling digital inspection</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('history')}
                className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <History className="w-4 h-4 text-white" />
                </div>
                <span className="text-body-sm font-medium"><strong>History</strong> of grain grading evolution</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-heading-3 font-bold text-gray-900 dark:text-gray-100 mb-8">How I Collect Data</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="bg-sky-blue/10 rounded-lg p-8 mb-6 inline-block">
              <span className="text-heading-3 font-bold text-sky-blue">1</span>
            </div>
            <h4 className="text-heading-4 font-bold text-gray-900 dark:text-gray-100 mb-4">Company Research</h4>
            <p className="text-body-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I browse company websites, press releases, and LinkedIn to find grain tech companies and understand
              what they're building. Lots of manual research and spreadsheet work.
            </p>
          </div>
          <div>
            <div className="bg-growth-green/10 rounded-lg p-8 mb-6 inline-block">
              <span className="text-heading-3 font-bold text-growth-green">2</span>
            </div>
            <h4 className="text-heading-4 font-bold text-gray-900 dark:text-gray-100 mb-4">Academic Research</h4>
            <p className="text-body-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I search Google Scholar and arXiv for papers on computer vision in agriculture. Helps me understand
              the science behind these tools and what's cutting-edge.
            </p>
          </div>
          <div>
            <div className="bg-grain-gold/10 rounded-lg p-8 mb-6 inline-block">
              <span className="text-heading-3 font-bold text-grain-gold">3</span>
            </div>
            <h4 className="text-heading-4 font-bold text-gray-900 dark:text-gray-100 mb-4">Industry News</h4>
            <p className="text-body-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I follow ag-tech news sites, regulatory updates from USDA/CGC, and industry forums to catch
              announcements and trends as they happen.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-gradient-to-r from-soil-brown to-soil-brown-dark rounded-xl p-8 text-white shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="shrink-0">
            <BrainCircuit className="w-16 h-16 text-white/80" />
          </div>
          <div>
            <h3 className="text-heading-3 font-bold mb-4">Tech Stack & Learning Goals</h3>
            <p className="text-body-sm leading-relaxed mb-6">
              This project is my playground for learning modern web development. I'm using React with TypeScript,
              practicing component architecture, state management, and data visualization. The grain tech domain
              gives me real-world data to work with instead of generic to-do apps.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-body-sm">
              <div>
                <span className="font-bold block mb-2">Frontend</span>
                React, TypeScript, Tailwind CSS, Vite
              </div>
              <div>
                <span className="font-bold block mb-2">Data Viz</span>
                Recharts, custom chart components
              </div>
              <div>
                <span className="font-bold block mb-2">Deployment</span>
                Vercel, GitHub Actions, continuous deployment
              </div>
            </div>
            <p className="text-body-sm leading-relaxed mt-6">
              Every feature here—from the filterable company landscape to the timeline visualizations—is a chance
              to practice a new skill. The data keeps me motivated, and the code keeps me learning. It's been a
              great way to combine a professional interest with technical skill development.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}
