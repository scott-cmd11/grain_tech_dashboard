import { Share2, Download, ChevronDown, CheckSquare } from "lucide-react";
import type { ExportFormat } from "../../types";

interface MatrixToolbarProps {
    selectedCount: number;
    onCompare: () => void;
    onShare: () => void;
    onExport: (format: ExportFormat) => void;
    compactView: boolean;
    onCompactViewToggle: () => void;
}

export function MatrixToolbar({
    selectedCount,
    onCompare,
    onShare,
    onExport,
    compactView,
    onCompactViewToggle,
}: MatrixToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {selectedCount > 0 && (
                <button
                    onClick={onCompare}
                    className="px-3 py-2 text-xs rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors inline-flex items-center gap-2"
                >
                    <CheckSquare className="w-4 h-4" />
                    Compare ({selectedCount})
                </button>
            )}
            <button
                onClick={onShare}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Share filtered view"
            >
                <Share2 className="w-5 h-5" />
            </button>
            <button
                onClick={onCompactViewToggle}
                className="px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
                {compactView ? "Expanded view" : "Compact view"}
            </button>
            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                    onClick={() => onExport("csv")}
                    className="px-3 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors inline-flex items-center gap-2 border-r border-gray-200 dark:border-gray-600"
                    title="Download as CSV"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
                <div className="relative group">
                    <button className="px-2 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                        <button
                            onClick={() => onExport("json")}
                            className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
                        >
                            <Share2 className="w-3 h-3 text-gray-400" />
                            JSON Format
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatrixToolbar;
