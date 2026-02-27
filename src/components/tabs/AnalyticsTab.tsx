import { Globe, Sprout } from 'lucide-react';
import { SimpleDonutChart, SimpleHorizontalBarChart, TechnologyRadar, FundingTimeline } from '../index';
import { companiesData } from '../../data';
import { getDenormalizedSolutions } from '../../utils/dataNormalization';
import { useState, useEffect, useMemo } from 'react';
import { Skeleton, SkeletonChart, SkeletonGrid } from '../Skeleton';
import { formatEnumLabel } from '../../utils/formatLabels';
import { PageHeader } from '../ui';

interface AnalyticsTabProps {
    searchTerm?: string;
    allCountries?: string[];
    allCrops?: string[];
    allTypes?: string[];
}

export function AnalyticsTab({ searchTerm = "" }: AnalyticsTabProps) {
    const [isLoading, setIsLoading] = useState(true);

    const grainSolutions = useMemo(() => getDenormalizedSolutions(), []);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, []);

    // Compute stats from grain solutions
    const stats = useMemo(() => {
        const regionsSet = new Set<string>();
        grainSolutions.forEach(s => s.regions.forEach(r => regionsSet.add(r)));
        const allRegions = Array.from(regionsSet).sort();

        const techSet = new Set<string>();
        grainSolutions.forEach(s => s.sensingTech.forEach(t => techSet.add(t)));
        const allTechs = Array.from(techSet).sort();

        const formFactorSet = new Set<string>();
        grainSolutions.forEach(s => s.formFactors.forEach(f => formFactorSet.add(f)));
        const allFormFactors = Array.from(formFactorSet).sort();

        const useCaseSet = new Set<string>();
        grainSolutions.forEach(s => s.useCases.forEach(u => useCaseSet.add(u)));
        const allUseCases = Array.from(useCaseSet).sort();

        return { allRegions, allTechs, allFormFactors, allUseCases };
    }, [grainSolutions]);

    const filteredSolutions = useMemo(() => {
        if (!searchTerm.trim()) return grainSolutions;
        const query = searchTerm.toLowerCase();
        return grainSolutions.filter(s =>
            s.company.toLowerCase().includes(query) ||
            s.productName.toLowerCase().includes(query) ||
            s.sensingTech.some(t => t.toLowerCase().includes(query)) ||
            s.regions.some(r => r.toLowerCase().includes(query))
        );
    }, [grainSolutions, searchTerm]);

    // Technology breakdown chart data
    const techStats = useMemo(() => {
        const counts: Record<string, number> = {};
        filteredSolutions.forEach(s => {
            s.sensingTech.forEach(tech => {
                counts[tech] = (counts[tech] || 0) + 1;
            });
        });
        const colors = ['#0D9488', '#3b82f6', '#D97706', '#8b5cf6', '#ec4899', '#06b6d4'];
        return Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .map(([label, value], index) => ({
                label: formatEnumLabel(label),
                value,
                color: colors[index % colors.length],
            }));
    }, [filteredSolutions]);

    const formFactorStats = useMemo(() => {
        const counts: Record<string, number> = {};
        filteredSolutions.forEach(s => {
            s.formFactors.forEach(factor => {
                counts[factor] = (counts[factor] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .map(([label, value]) => ({ label: formatEnumLabel(label), value }))
            .sort((a, b) => b.value - a.value);
    }, [filteredSolutions]);

    const regionStats = useMemo(() => {
        const counts: Record<string, number> = {};
        filteredSolutions.forEach(s => {
            s.regions.forEach(region => {
                counts[region] = (counts[region] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .map(([label, value]) => ({ label: formatEnumLabel(label), value }))
            .sort((a, b) => b.value - a.value);
    }, [filteredSolutions]);

    const useCaseStats = useMemo(() => {
        const counts: Record<string, number> = {};
        filteredSolutions.forEach(s => {
            s.useCases.forEach(useCase => {
                counts[useCase] = (counts[useCase] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .map(([label, value]) => ({ label: formatEnumLabel(label), value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }, [filteredSolutions]);

    if (isLoading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <SkeletonChart />
                    <SkeletonChart />
                </div>
                <SkeletonGrid count={3} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Analytics"
                description="Market intelligence derived from tracked grain quality solutions."
            />

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Solutions', value: grainSolutions.length, detail: 'Tracked globally' },
                    { label: 'Regions', value: stats.allRegions.length, detail: 'Active markets' },
                    { label: 'Technologies', value: stats.allTechs.length, detail: 'Sensing types' },
                    { label: 'Form Factors', value: stats.allFormFactors.length, detail: 'Device types' },
                ].map(kpi => (
                    <div key={kpi.label} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{kpi.label}</p>
                        <p className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-white mt-1">{kpi.value}</p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{kpi.detail}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5">
                    <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-5 text-center">
                        Technology Breakdown
                    </h3>
                    <SimpleDonutChart data={techStats} />
                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                        {techStats[0]?.label || 'RGB Imaging'} leads among {filteredSolutions.length} solutions
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5">
                    <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-4 text-center">
                        Form Factor Distribution
                    </h3>
                    <SimpleHorizontalBarChart data={formFactorStats} color="bg-accent-500" />
                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                        {formFactorStats[0]?.label || 'Benchtop'} and {formFactorStats[1]?.label || 'mobile'} solutions are most common
                    </p>
                </div>
            </div>

            {/* Region & Use Case */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-zinc-400" />
                        Regional Coverage
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {regionStats.slice(0, 12).map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700"
                            >
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
                                <span className="text-[10px] bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded font-semibold tabular-nums">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                        <Sprout className="w-4 h-4 text-zinc-400" />
                        Top Use Cases
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {useCaseStats.map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700"
                            >
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
                                <span className="text-[10px] bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded font-semibold tabular-nums">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Technology Radar & Funding Timeline */}
            <div className="grid lg:grid-cols-2 gap-4">
                <TechnologyRadar companies={companiesData} />
                <FundingTimeline companies={companiesData} />
            </div>
        </div>
    );
}
