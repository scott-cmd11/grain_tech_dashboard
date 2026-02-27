import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TrendingUp, Globe, Zap, BarChart3, Users, Lightbulb, AlertCircle, CheckCircle, ExternalLink, Cpu, ChevronRight, ArrowUp } from 'lucide-react';
import {
  adoptionTrends,
  regionalData,
  sensingTechTrends,
  companyMilestones,
  useCaseAdoption,
  emergingTechnologies,
  marketProjections,
  futureOutlook,
  aiGrainGradingTechnologies,
} from '../../data/trends';

export function TrendsPage() {
  // Chart colors aligned with wheat/amber branding
  const colors = ['#D97706', '#F59E0B', '#B45309', '#92400E', '#78350F'];

  // Track scroll position for back-to-top button
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Check all possible scroll containers
    const getScrollTop = () => {
      const mainElement = document.querySelector('main');
      return Math.max(
        window.scrollY,
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        mainElement?.scrollTop ?? 0
      );
    };

    const handleScroll = () => {
      const scrollTop = getScrollTop();
      setShowBackToTop(scrollTop > 300);
    };

    // Listen to all possible scroll events
    const mainElement = document.querySelector('main');
    mainElement?.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('scroll', handleScroll);

    // Check initial state
    handleScroll();

    return () => {
      mainElement?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Back to Top Button - Portaled to body to avoid transform issues */}
      {showBackToTop && createPortal(
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-lg bg-accent-600 text-white shadow-md hover:bg-accent-700 transition-colors duration-150"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>,
        document.body
      )}

      {/* Page Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-2">
          Market Trends & Outlook
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl">
          Comprehensive analysis of grain quality technology adoption, market evolution, and future opportunities
        </p>
        <p className="text-xs text-gray-500 mt-3 italic border-l-2 border-amber-400 pl-3">
          Indicative projections based on compiled reports; not financial advice.
        </p>
      </div>

      {/* Page Contents Navigation */}
      <nav className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-3">
          <ChevronRight className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Page Contents</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'adoption-trends', label: 'Adoption Trends', icon: TrendingUp },
            { id: 'regional-market', label: 'Regional Markets', icon: Globe },
            { id: 'sensing-tech', label: 'Sensing Tech', icon: Zap },
            { id: 'market-size', label: 'Market Size', icon: BarChart3 },
            { id: 'company-timeline', label: 'Timeline', icon: Users },
            { id: 'use-cases', label: 'Use Cases', icon: CheckCircle },
            { id: 'emerging-tech', label: 'Emerging Tech', icon: Lightbulb },
            { id: 'ai-grain-sampling', label: 'AI Grain Sampling', icon: Cpu },
            { id: 'future-outlook', label: 'Future Outlook', icon: AlertCircle },
          ].map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-800 dark:hover:text-amber-300 transition-colors border border-amber-200 dark:border-amber-800/50 whitespace-nowrap"
            >
              <Icon className="w-3 h-3 flex-shrink-0" />
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* 1. Technology Adoption Trends */}
      <section id="adoption-trends" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Technology Adoption Trends</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Market shift from benchtop lab systems to mobile and inline grading solutions (2018-2025)
        </p>

        {/* Adoption Chart */}
        <div className="overflow-x-auto pb-4 mb-2">
          <div className="flex gap-4 pb-4" style={{ minWidth: '600px' }}>
            {adoptionTrends.map((trend) => (
              <div key={trend.year} className="flex-1 text-center">
                <div className="relative h-64 mb-2 flex items-flex-end gap-1 justify-center">
                  {/* Benchtop bar */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-6 rounded-t"
                      style={{
                        height: `${(trend.benchtop / 70) * 200}px`,
                        backgroundColor: colors[0],
                      }}
                    />
                  </div>
                  {/* Mobile bar */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-6 rounded-t"
                      style={{
                        height: `${(trend.mobile / 70) * 200}px`,
                        backgroundColor: colors[1],
                      }}
                    />
                  </div>
                  {/* Inline bar */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-6 rounded-t"
                      style={{
                        height: `${(trend.inline / 70) * 200}px`,
                        backgroundColor: colors[2],
                      }}
                    />
                  </div>
                </div>
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{trend.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[0] }} />
            <span className="text-xs text-gray-600 dark:text-gray-400">Benchtop Lab Systems</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[1] }} />
            <span className="text-xs text-gray-600 dark:text-gray-400">Mobile/Handheld</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[2] }} />
            <span className="text-xs text-gray-600 dark:text-gray-400">Inline Industrial</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
          <p className="text-xs text-gray-500 italic">Source: Internal Market Analysis & Industry Reports</p>
        </div>
      </section>

      {/* 2. Regional Market Expansion */}
      <section id="regional-market" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-cyan-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Regional Market Expansion</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Global distribution of grain technology companies and regional adoption rates
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {regionalData.map((region) => (
            <div
              key={region.region}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{region.region}</h4>
                <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-500">
                  +{region.growth}% YoY
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Companies</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{region.companies}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Adoption Rate</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{region.adoption}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-amber-500 rounded-full h-2"
                      style={{ width: `${region.adoption}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Market Share</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{region.marketShare}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
          <p className="text-xs text-gray-500 italic">Source: FAO & regional agricultural trade data</p>
        </div>
      </section>

      {/* 3. Sensing Technology Evolution */}
      <section id="sensing-tech" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sensing Technology Evolution</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Adoption and maturity levels of different sensing technologies in grain quality assessment
        </p>

        <div className="space-y-4">
          {sensingTechTrends
            .sort((a, b) => b.adoption - a.adoption)
            .map((tech) => (
              <div key={tech.technology}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{tech.technology}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tech.yearsInMarket} years • {tech.maturity}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{tech.adoption}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`rounded-full h-3 transition-all ${tech.maturity === 'Mature'
                      ? 'bg-amber-600'
                      : tech.maturity === 'Commercial'
                        ? 'bg-amber-500'
                        : tech.maturity === 'Pilot'
                          ? 'bg-amber-400'
                          : 'bg-amber-300'
                      }`}
                    style={{ width: `${tech.adoption}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
          <p className="text-xs text-gray-500 italic">Source: Journal of Food Engineering & Tech Adoption Surveys</p>
        </div>
      </section>

      {/* 4. Market Size & Investment Trends */}
      <section id="market-size" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Market Size & Growth Projections</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Estimated grain technology market size (in millions USD) with 15%+ compound annual growth
        </p>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 pb-4" style={{ minWidth: '600px' }}>
            {marketProjections.map((proj) => (
              <div key={proj.year} className="flex-1 text-center">
                <div className="relative h-48 mb-2 flex items-flex-end justify-center">
                  <div
                    className="w-8 rounded-t"
                    style={{
                      height: `${(proj.marketSize / 415) * 180}px`,
                      backgroundColor: colors[2],
                    }}
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">${proj.marketSize}M</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{proj.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Citations for Market Chart */}
        <div className="mb-6 flex flex-wrap gap-4">
          {marketProjections
            .filter(p => p.citations && p.citations.length > 0)
            .map(p => (
              <div key={p.year} className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                <span className="font-semibold">{p.year} Projection:</span>
                {p.citations?.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline inline-flex items-center gap-1">
                    Source <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            ))
          }
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-amber-500 mb-1">15-16%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Annual Growth Rate</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-amber-600 mb-1">$415M</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">2027 Projected Market</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-amber-500 mb-1">2.8x</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Growth since 2020</div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
          <p className="text-xs text-gray-500 italic">Source: Internal estimate based on MarketsAndMarkets & OECD data (2020–2027)</p>
        </div>
      </section>

      {/* 5. Company Growth Timeline */}
      <section id="company-timeline" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Company Growth Timeline</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Key company milestones and market developments
        </p>

        <div className="space-y-4">
          {companyMilestones
            .sort((a, b) => a.year - b.year)
            .map((milestone, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white dark:border-gray-800" />
                  {idx < companyMilestones.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-start gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{milestone.company}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.event}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${milestone.type === 'Founding'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : milestone.type === 'Product Launch'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : milestone.type === 'Funding'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                        }`}
                    >
                      {milestone.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{milestone.year}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 6. Use Case Adoption */}
      <section id="use-cases" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Use Case Adoption Trends</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Fastest-growing applications for grain quality technology
        </p>

        <div className="space-y-4">
          {useCaseAdoption
            .sort((a, b) => b.growth - a.growth)
            .map((useCase) => (
              <div key={useCase.useCase}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{useCase.useCase}</h4>
                  <span className="text-xs text-amber-500 font-bold">+{useCase.growth}%</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-amber-500 rounded-full h-2"
                        style={{ width: `${useCase.adoption}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right">{useCase.adoption}%</span>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
          <p className="text-xs text-gray-500 italic">Source: Aggregated Industry Market Research (2024)</p>
        </div>
      </section>

      {/* 7. Emerging Technologies */}
      <section id="emerging-tech" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-indigo-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Emerging Technologies</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Cutting-edge technologies that will shape the future of grain quality assessment
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {emergingTechnologies.map((tech) => (
            <div
              key={tech.name}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{tech.name}</h4>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${tech.maturityLevel === 'Commercial'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : tech.maturityLevel === 'Pilot'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {tech.maturityLevel}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{tech.description}</p>

              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Readiness</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{tech.readinessPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-amber-500 rounded-full h-2"
                    style={{ width: `${tech.readinessPercentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Applications:</span>
                  <ul className="flex flex-wrap gap-1 mt-1">
                    {tech.applications.slice(0, 2).map((app) => (
                      <li key={app} className="text-gray-600 dark:text-gray-400">
                        • {app}
                      </li>
                    ))}
                    {tech.applications.length > 2 && (
                      <li className="text-gray-600 dark:text-gray-400">• +{tech.applications.length - 2} more</li>
                    )}
                  </ul>
                </div>
              </div>

              {tech.expectedCommercialDate && (
                <p className="text-xs text-amber-500 font-semibold mt-3">
                  Expected commercial: {tech.expectedCommercialDate}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. AI-Integrated Grain Sampling */}
      <section id="ai-grain-sampling" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm scroll-mt-20">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI-Integrated Grain Sampling</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Where AI grain grading technology is heading: from benchtop to on-combine integration with automatic grain samplers
        </p>

        {/* Integration Points Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {['On-Combine', 'Inline', 'Mobile/Smartphone', 'Benchtop'].map((point) => {
            const count = aiGrainGradingTechnologies.filter(t => t.integrationPoint === point || (point === 'On-Combine' && t.integrationPoint === 'On-Combine')).length;
            return (
              <div key={point} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-amber-500">{count}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{point}</div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {aiGrainGradingTechnologies.map((tech) => (
            <div
              key={tech.name}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{tech.name}</h4>
                  <p className="text-xs text-gray-500">{tech.company} • {tech.country}</p>
                </div>
                <div className="flex gap-1">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${tech.status === 'Commercial'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : tech.status === 'Pilot'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {tech.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{tech.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">
                  {tech.integrationPoint}
                </span>
                {tech.technology.slice(0, 2).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={tech.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                Source: {tech.source.name} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            Key Trend: Harvest-Time Grading
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            The industry is moving toward <strong>real-time grading during harvest</strong>, eliminating delays between sampling and quality assessment.
            Ground Truth Agriculture's on-combine system (expected 2025) and PerkinElmer's DA7350 sensors represent this shift toward
            integrating AI directly into grain samplers and combines.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-right">
          <p className="text-xs text-gray-500 italic">
            Sources: Protein Industries Canada, company websites, industry publications (2024)
          </p>
        </div>
      </section>

      {/* 9. Future Outlook */}
      <section id="future-outlook" className="space-y-6 scroll-mt-20">
        {/* Next 3 Years */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Next 3 Years: Key Predictions
          </h3>
          <ul className="space-y-3">
            {futureOutlook.nextThreeYears.map((prediction, idx) => (
              <li key={idx} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{prediction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Areas to Watch */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Key Areas to Watch
          </h3>
          <ul className="space-y-3">
            {futureOutlook.keyAreasToWatch.map((area, idx) => (
              <li key={idx} className="flex gap-3">
                <TrendingUp className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Potential Risks
          </h3>
          <ul className="space-y-2">
            {futureOutlook.risks.map((risk, idx) => (
              <li key={idx} className="text-sm text-amber-800 dark:text-amber-200">
                • {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Market Opportunities
          </h3>
          <ul className="space-y-2">
            {futureOutlook.opportunities.map((opp, idx) => (
              <li key={idx} className="text-sm text-green-800 dark:text-green-200">
                • {opp}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default TrendsPage;
