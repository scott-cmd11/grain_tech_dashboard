import { useMemo, useState } from "react";
import { Calendar, ExternalLink, BookOpen } from "lucide-react";
import { eventsSortedByDate } from "../data/registries/events";
import type { AdoptionEvent } from "../data/adoptionTimeline";
import type {
  GrainSolution,
  Region,
} from "../data/grainTechEntities";
import { formatEnumLabel } from "../utils/formatLabels";

interface GrainAdoptionTimelineProps {
  adoptionEvents?: any[]; // Loose type for now as we transition schemas
  grainSolutions?: GrainSolution[];
}

const categoryColors: Record<AdoptionEvent["category"], string> = {
  ProductLaunch: "bg-emerald-600",
  Regulation: "bg-blue-500",
  Pilot: "bg-amber-500",
  NationalProgram: "bg-teal-600",
  Other: "bg-slate-500",
};

const chipBase =
  "px-3 py-1 text-xs rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500";


function toggleFilter<T>(items: T[], value: T): T[] {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

function matchCompanies(event: AdoptionEvent, solutions: GrainSolution[]): GrainSolution[] {
  if (!event.relatedCompanyIds || event.relatedCompanyIds.length === 0) {
    return [];
  }
  const needles = event.relatedCompanyIds.map((id) => id.toLowerCase());
  return solutions.filter((solution) => {
    const hay = `${solution.company} ${solution.productName}`.toLowerCase();
    return needles.some((needle) => hay.includes(needle));
  });
}

export const GrainAdoptionTimeline = function GrainAdoptionTimeline({
  adoptionEvents: propEvents,
  grainSolutions,
}: GrainAdoptionTimelineProps) {
  const adoptionEvents = propEvents || eventsSortedByDate;
  const [regions, setRegions] = useState<Region[]>([]);
  const [categories, setCategories] = useState<AdoptionEvent["category"][]>([]);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  const regionOptions = useMemo(() => {
    const set = new Set<Region | "Global">();
    adoptionEvents.forEach((event) => set.add(event.region));
    return Array.from(set).sort();
  }, [adoptionEvents]);

  const categoryOptions = useMemo(() => {
    const set = new Set<AdoptionEvent["category"]>();
    adoptionEvents.forEach((event) => set.add(event.category));
    return Array.from(set).sort();
  }, [adoptionEvents]);

  const filteredEvents = useMemo(() => {
    return adoptionEvents.filter((event) => {
      const matchRegion = regions.length === 0 || regions.includes(event.region as Region);
      const matchCategory = categories.length === 0 || categories.includes(event.category);
      return matchRegion && matchCategory;
    });
  }, [adoptionEvents, regions, categories]);

  // Sort Newest -> Oldest (descending) for vertical timeline
  const grouped = useMemo(() => {
    const byYear = new Map<number, AdoptionEvent[]>();
    filteredEvents.forEach((event) => {
      const list = byYear.get(event.year) ?? [];
      list.push(event);
      byYear.set(event.year, list);
    });
    return Array.from(byYear.entries())
      .sort((a, b) => b[0] - a[0]) // DESCENDING - newest first
      .map(([year, events]) => ({
        year,
        events: events.sort((a, b) => (b.month ?? 0) - (a.month ?? 0)),
      }));
  }, [filteredEvents]);

  const clearFilters = () => {
    setRegions([]);
    setCategories([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Adoption Timeline
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tracking the evolution of digital grain grading technology
              </p>
            </div>
          </div>
          <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">
            {filteredEvents.length} milestones
          </div>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-start gap-8 py-4 border-y border-gray-100 dark:border-gray-700">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Regions</span>
            <div className="flex flex-wrap gap-2">
              {regionOptions.map((region) => (
                <button
                  key={region}
                  onClick={() => setRegions((prev) => toggleFilter(prev, region as Region))}
                  className={`${chipBase} ${regions.includes(region as Region)
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-400"
                    }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategories((prev) => toggleFilter(prev, category))}
                  className={`${chipBase} ${categories.includes(category)
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-indigo-400"
                    }`}
                >
                  {formatEnumLabel(category)}
                </button>
              ))}
            </div>
          </div>

          {(regions.length > 0 || categories.length > 0) && (
            <button onClick={clearFilters} className="text-xs text-red-500 hover:underline self-end pb-1">
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-teal-400 to-emerald-400 dark:from-indigo-600 dark:via-teal-600 dark:to-emerald-600" />

        <div className="space-y-8">
          {grouped.map((group) => (
            <div key={group.year} className="relative">
              {/* Year Marker */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-white">{group.year}</span>
                </div>
                <h4 className="text-2xl font-black text-gray-200 dark:text-gray-700 select-none">
                  {group.year}
                </h4>
              </div>

              {/* Events for this year */}
              <div className="ml-14 space-y-4">
                {group.events.map((event) => {
                  const isActive = activeEventId === event.id;
                  const relatedSolutions = isActive ? matchCompanies(event, grainSolutions ?? []) : [];
                  const hasCitations = event.citations && event.citations.length > 0;

                  return (
                    <div
                      key={event.id}
                      className={`bg-white dark:bg-gray-800 rounded-xl border transition-all flex flex-col shadow-sm hover:shadow-md ${isActive
                        ? "border-teal-500 ring-1 ring-teal-500 scale-[1.01]"
                        : "border-gray-200 dark:border-gray-700"
                        }`}
                    >
                      {/* Card Content */}
                      <div
                        className="p-5 flex-1 cursor-pointer"
                        onClick={() => setActiveEventId(isActive ? null : event.id)}
                      >
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className={`w-2 h-2 rounded-full ${categoryColors[event.category]}`} />
                          <span className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400">
                            {formatEnumLabel(event.category)}
                          </span>
                          {event.month && (
                            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded">
                              {new Date(2000, event.month - 1).toLocaleString('default', { month: 'short' })}
                            </span>
                          )}
                          <span className="ml-auto text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded">
                            {event.region}
                          </span>
                        </div>

                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.description}
                        </p>
                      </div>

                      {/* Footer / Source Links */}
                      {(event.url || hasCitations) && (
                        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 rounded-b-xl flex items-center justify-between gap-4">
                          {event.url && (
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Source <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {hasCitations && (
                            <span className="flex items-center gap-1 text-[10px] text-gray-400">
                              <BookOpen className="w-3 h-3" />
                              {event.citations!.length + 1} sources
                            </span>
                          )}
                        </div>
                      )}

                      {/* Inline Expansion for Solutions */}
                      {isActive && relatedSolutions.length > 0 && (
                        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-teal-50/50 dark:bg-gray-800/80 animate-in slide-in-from-top-2 duration-200">
                          <p className="text-xs font-bold text-teal-800 dark:text-teal-400 mb-2">Related Technology:</p>
                          <div className="space-y-2">
                            {relatedSolutions.map(sol => (
                              <div key={sol.id} className="text-xs bg-white dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600 shadow-sm">
                                <div className="font-semibold">{sol.company}</div>
                                <div className="text-gray-500">{sol.productName}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Inline Expansion for Citations */}
                      {isActive && hasCitations && (
                        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-blue-50/50 dark:bg-gray-800/80 animate-in slide-in-from-top-2 duration-200">
                          <p className="text-xs font-bold text-blue-800 dark:text-blue-400 mb-2">Additional Sources:</p>
                          <div className="space-y-1">
                            {event.citations!.map((url, idx) => (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-xs text-blue-600 hover:underline truncate"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {new URL(url).hostname}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrainAdoptionTimeline;
