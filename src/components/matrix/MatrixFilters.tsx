import type { Region, SensingTech, FormFactor, UseCase } from "../../data/grainTechEntities";
import { formatEnumLabel } from "../../utils/formatLabels";
import { sensingColors } from "../../constants/grainTechColors";
import { FilterDropdown } from "./FilterDropdown";

interface MatrixFiltersProps {
    // Filter state
    regions: Region[];
    sensing: SensingTech[];
    formFactors: FormFactor[];
    useCases: UseCase[];
    // Filter options
    availableRegions: Region[];
    availableSensing: SensingTech[];
    availableFormFactors: FormFactor[];
    availableUseCases: UseCase[];
    // Callbacks
    onRegionToggle: (region: Region) => void;
    onSensingToggle: (tech: SensingTech) => void;
    onFormFactorToggle: (factor: FormFactor) => void;
    onUseCaseToggle: (useCase: UseCase) => void;
    onClear: () => void;
}



export function MatrixFilters({
    regions,
    sensing,
    formFactors,
    useCases,
    availableRegions,
    availableSensing,
    availableFormFactors,
    availableUseCases,
    onRegionToggle,
    onSensingToggle,
    onFormFactorToggle,
    onUseCaseToggle,
    onClear,
}: MatrixFiltersProps) {
    const hasActiveFilters =
        regions.length > 0 ||
        sensing.length > 0 ||
        formFactors.length > 0 ||
        useCases.length > 0;

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                <FilterDropdown
                    label="Regions"
                    options={availableRegions}
                    selected={regions}
                    onToggle={onRegionToggle}
                    colorClass="emerald"
                />
                <FilterDropdown
                    label="Sensing Tech"
                    options={availableSensing}
                    selected={sensing}
                    onToggle={onSensingToggle}
                    colorClass="blue"
                />
                <FilterDropdown
                    label="Form Factors"
                    options={availableFormFactors}
                    selected={formFactors}
                    onToggle={onFormFactorToggle}
                    colorClass="indigo"
                />
                <FilterDropdown
                    label="Use Cases"
                    options={availableUseCases}
                    selected={useCases}
                    onToggle={onUseCaseToggle}
                    colorClass="teal"
                />
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    {regions.map((region) => (
                        <button
                            key={`region-${region}`}
                            onClick={() => onRegionToggle(region)}
                            className="px-3 py-1 text-xs rounded-full border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                        >
                            Region: {formatEnumLabel(region)}
                        </button>
                    ))}
                    {sensing.map((tech) => (
                        <button
                            key={`sensing-${tech}`}
                            onClick={() => onSensingToggle(tech)}
                            className="px-3 py-1 text-xs rounded-full text-white hover:opacity-80"
                            style={{ backgroundColor: sensingColors[tech] }}
                        >
                            Sensing: {formatEnumLabel(tech)}
                        </button>
                    ))}
                    {formFactors.map((factor) => (
                        <button
                            key={`formFactor-${factor}`}
                            onClick={() => onFormFactorToggle(factor)}
                            className="px-3 py-1 text-xs rounded-full border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                        >
                            FormFactor: {formatEnumLabel(factor)}
                        </button>
                    ))}
                    {useCases.map((useCase) => (
                        <button
                            key={`useCase-${useCase}`}
                            onClick={() => onUseCaseToggle(useCase)}
                            className="px-3 py-1 text-xs rounded-full border border-teal-200 dark:border-teal-700 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50"
                        >
                            UseCase: {formatEnumLabel(useCase)}
                        </button>
                    ))}
                    <button
                        onClick={onClear}
                        className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
}

export default MatrixFilters;
