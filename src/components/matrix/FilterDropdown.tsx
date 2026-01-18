import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { formatEnumLabel } from "../../utils/formatLabels";

interface FilterDropdownProps<T extends string> {
    label: string;
    options: T[];
    selected: T[];
    onToggle: (item: T) => void;
    colorClass: "emerald" | "blue" | "indigo" | "teal";
}

const colorVariants = {
    emerald: {
        activeBg: "bg-emerald-100 dark:bg-emerald-900/30",
        activeBorder: "border-emerald-200 dark:border-emerald-700",
        activeText: "text-emerald-700 dark:text-emerald-300",
        badge: "bg-emerald-500",
        itemSelected: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
        checkIcon: "text-emerald-500"
    },
    blue: {
        activeBg: "bg-blue-100 dark:bg-blue-900/30",
        activeBorder: "border-blue-200 dark:border-blue-700",
        activeText: "text-blue-700 dark:text-blue-300",
        badge: "bg-blue-500",
        itemSelected: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
        checkIcon: "text-blue-500"
    },
    indigo: {
        activeBg: "bg-indigo-100 dark:bg-indigo-900/30",
        activeBorder: "border-indigo-200 dark:border-indigo-700",
        activeText: "text-indigo-700 dark:text-indigo-300",
        badge: "bg-indigo-500",
        itemSelected: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300",
        checkIcon: "text-indigo-500"
    },
    teal: {
        activeBg: "bg-teal-100 dark:bg-teal-900/30",
        activeBorder: "border-teal-200 dark:border-teal-700",
        activeText: "text-teal-700 dark:text-teal-300",
        badge: "bg-teal-500",
        itemSelected: "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
        checkIcon: "text-teal-500"
    }
};

export function FilterDropdown<T extends string>({
    label,
    options,
    selected,
    onToggle,
    colorClass,
}: FilterDropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedCount = selected.length;
    const isActive = selectedCount > 0;
    const colors = colorVariants[colorClass];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all
                    ${isActive
                        ? `${colors.activeBg} ${colors.activeBorder} ${colors.activeText}`
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                `}
            >
                <span>{label}</span>
                {selectedCount > 0 && (
                    <span className={`
                        flex items-center justify-center w-5 h-5 text-[10px] rounded-full 
                        ${colors.badge} text-white
                    `}>
                        {selectedCount}
                    </span>
                )}
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-2">
                    <div className="space-y-1">
                        {options.map((option) => {
                            const isSelected = selected.includes(option);
                            return (
                                <button
                                    key={option}
                                    onClick={() => onToggle(option)}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors
                                        ${isSelected
                                            ? `${colors.itemSelected} font-medium`
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        }
                                    `}
                                >
                                    <span>{formatEnumLabel(option)}</span>
                                    {isSelected && <Check className={`w-3 h-3 ${colors.checkIcon}`} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
