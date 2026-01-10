import type { Region, SensingTech, FormFactor, UseCase } from "../../data/grainTechEntities";
import { formatEnumLabel } from "../../utils/formatLabels";
import { sensingColors } from "../../constants/grainTechColors";

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

const chipBase =
    "px-3 py-1 text-xs rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500";

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
            <div className="grid gap-4 lg:grid-cols-4">
                {/* Regions */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                        Regions
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {availableRegions.map((region) => {
                            const selected = regions.includes(region);
                            return (
                                <button
                                    key={region}
                                    onClick={() => onRegionToggle(region)}
                                    className={`${chipBase} ${selected
                                            ? "bg-emerald-500 border-emerald-500 text-white"
                                            : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                                        }`}
                                >
                                    {formatEnumLabel(region)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sensing Tech */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                        Sensing Tech
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {availableSensing.map((tech) => {
                            const selected = sensing.includes(tech);
                            return (
                                <button
                                    key={tech}
                                    onClick={() => onSensingToggle(tech)}
                                    className={`${chipBase} ${selected
                                            ? "bg-blue-500 border-blue-500 text-white"
                                            : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                                        }`}
                                >
                                    {formatEnumLabel(tech)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Form Factors */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                        Form Factors
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {availableFormFactors.map((factor) => {
                            const selected = formFactors.includes(factor);
                            return (
                                <button
                                    key={factor}
                                    onClick={() => onFormFactorToggle(factor)}
                                    className={`${chipBase} ${selected
                                            ? "bg-indigo-500 border-indigo-500 text-white"
                                            : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                                        }`}
                                >
                                    {formatEnumLabel(factor)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Use Cases */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                        Use Cases
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {availableUseCases.map((useCase) => {
                            const selected = useCases.includes(useCase);
                            return (
                                <button
                                    key={useCase}
                                    onClick={() => onUseCaseToggle(useCase)}
                                    className={`${chipBase} ${selected
                                            ? "bg-teal-500 border-teal-500 text-white"
                                            : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                                        }`}
                                >
                                    {formatEnumLabel(useCase)}
                                </button>
                            );
                        })}
                    </div>
                </div>
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
