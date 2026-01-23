import { Cpu, Globe, Sprout, BrainCircuit, Layers } from 'lucide-react';
import { SimpleDonutChart, SimpleHorizontalBarChart, TechnologyRadar, FundingTimeline } from '../index';
import { companiesData } from '../../data';
import { getDenormalizedSolutions } from '../../utils/dataNormalization';
import { useState, useEffect, useMemo } from 'react';
import { Skeleton, SkeletonChart, SkeletonGrid } from '../Skeleton';
import { formatEnumLabel } from '../../utils/formatLabels';

interface AnalyticsTabProps {
    searchTerm?: string;
    // Legacy props - now computed internally
    allCountries?: string[];
    allCrops?: string[];
    allTypes?: string[];
}

export function AnalyticsTab({ searchTerm = "" }: AnalyticsTabProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Use denormalized grain solutions as primary data source
    const grainSolutions = useMemo(() => getDenormalizedSolutions(), []);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Compute stats from grain solutions
    const stats = useMemo(() => {
        // Regions (countries)
        const regionsSet = new Set<string>();
        grainSolutions.forEach(s => s.regions.forEach(r => regionsSet.add(r)));
        const allRegions = Array.from(regionsSet).sort();

        // Sensing technologies
        const techSet = new Set<string>();
        grainSolutions.forEach(s => s.sensingTech.forEach(t => techSet.add(t)));
        const allTechs = Array.from(techSet).sort();

        // Form factors (device types)
        const formFactorSet = new Set<string>();
        grainSolutions.forEach(s => s.formFactors.forEach(f => formFactorSet.add(f)));
        const allFormFactors = Array.from(formFactorSet).sort();

        // Use cases
        const useCaseSet = new Set<string>();
        grainSolutions.forEach(s => s.useCases.forEach(u => useCaseSet.add(u)));
        const allUseCases = Array.from(useCaseSet).sort();

        // Maturity levels
        const maturitySet = new Set<string>();
        grainSolutions.forEach(s => {
            if (s.maturityLevel) maturitySet.add(s.maturityLevel);
        });
        const allMaturityLevels = Array.from(maturitySet);

        return { allRegions, allTechs, allFormFactors, allUseCases, allMaturityLevels };
    }, [grainSolutions]);

    // Filter solutions based on search term
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
        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
        return Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .map(([label, value], index) => ({
                label: formatEnumLabel(label),
                value,
                color: colors[index % colors.length],
            }));
    }, [filteredSolutions]);

    // Form factor breakdown for bar chart
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

    // Region breakdown
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

    // Use case breakdown
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
            .slice(0, 10); // Top 10
    }, [filteredSolutions]);

    if (isLoading) {
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <SkeletonChart />
                    <SkeletonChart />
                </div>
                <SkeletonGrid count={3} />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-up">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <Cpu className="w-16 h-16" />
                    </div>
                    <h3 className="text-emerald-100 font-medium text-xs uppercase tracking-wider mb-1">Solutions</h3>
                    <p className="text-4xl font-bold">{grainSolutions.length}</p>
                    <p className="text-xs text-emerald-100 mt-1">Tracked globally</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <Globe className="w-16 h-16" />
                    </div>
                    <h3 className="text-blue-100 font-medium text-xs uppercase tracking-wider mb-1">Regions</h3>
                    <p className="text-4xl font-bold">{stats.allRegions.length}</p>
                    <p className="text-xs text-blue-100 mt-1">Active markets</p>
                </div>
                <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-5 text-white shadow-lg shadow-violet-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <BrainCircuit className="w-16 h-16" />
                    </div>
                    <h3 className="text-violet-100 font-medium text-xs uppercase tracking-wider mb-1">Technologies</h3>
                    <p className="text-4xl font-bold">{stats.allTechs.length}</p>
                    <p className="text-xs text-violet-100 mt-1">Sensing types</p>
                </div>
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-teal-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <Layers className="w-16 h-16" />
                    </div>
                    <h3 className="text-teal-100 font-medium text-xs uppercase tracking-wider mb-1">Form Factors</h3>
                    <p className="text-4xl font-bold">{stats.allFormFactors.length}</p>
                    <p className="text-xs text-teal-100 mt-1">Device types</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-white/5 p-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6 text-center">
                        Technology Breakdown
                    </h3>
                    <SimpleDonutChart data={techStats} />
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        {techStats[0]?.label || 'RGB Imaging'} leads among {filteredSolutions.length} solutions
                    </p>
                </div>

                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-white/5 p-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
                        Form Factor Distribution
                    </h3>
                    <SimpleHorizontalBarChart data={formFactorStats} color="bg-emerald-500" />
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        {formFactorStats[0]?.label || 'Benchtop'} and {formFactorStats[1]?.label || 'mobile'} solutions are most common
                    </p>
                </div>
            </div>

            {/* Region & Use Case Stats */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-white/5 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-500" />
                        Regional Coverage
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {regionStats.slice(0, 12).map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200/50 dark:border-blue-800/50"
                            >
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">{label}</span>
                                <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full font-semibold">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-white/50 dark:border-white/5 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <Sprout className="w-5 h-5 text-emerald-500" />
                        Top Use Cases
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {useCaseStats.map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50"
                            >
                                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{label}</span>
                                <span className="text-xs bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Technology Radar & Funding Timeline - Using legacy data for compatibility */}
            <div className="grid lg:grid-cols-2 gap-6">
                <TechnologyRadar companies={companiesData} />
                <FundingTimeline companies={companiesData} />
            </div>
        </div>
    );
}
