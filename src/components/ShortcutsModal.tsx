import { useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ShortcutItem {
    keys: string[];
    description: string;
    category: string;
}

const shortcuts: ShortcutItem[] = [
    // Navigation
    { keys: ['Ctrl', 'K'], description: 'Open command palette', category: 'Navigation' },
    { keys: ['?'], description: 'Show keyboard shortcuts', category: 'Navigation' },
    { keys: ['Esc'], description: 'Close dialogs and menus', category: 'Navigation' },

    // Theme
    { keys: ['Ctrl', 'Shift', 'L'], description: 'Toggle dark mode', category: 'Theme' },

    // News
    { keys: ['S'], description: 'Save/unsave article (when hovering)', category: 'News' },

    // Scenario Explorer
    { keys: ['Ctrl', 'C'], description: 'Copy shareable scenario URL', category: 'Scenario Explorer' },
];

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Group shortcuts by category
    const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
        if (!acc[shortcut.category]) {
            acc[shortcut.category] = [];
        }
        acc[shortcut.category].push(shortcut);
        return acc;
    }, {} as Record<string, ShortcutItem[]>);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden pointer-events-auto animate-scale-up"
                    role="dialog"
                    aria-label="Keyboard shortcuts"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-600 to-blue-600">
                        <div className="flex items-center gap-3 text-white">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Keyboard className="w-5 h-5" />
                            </div>
                            <h2 className="font-bold text-lg">Keyboard Shortcuts</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-6">
                            {Object.entries(groupedShortcuts).map(([category, items]) => (
                                <div key={category}>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                                        {category}
                                    </h3>
                                    <div className="space-y-2">
                                        {items.map((shortcut, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {shortcut.description}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {shortcut.keys.map((key, keyIdx) => (
                                                        <span key={keyIdx}>
                                                            <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm text-gray-700 dark:text-gray-300">
                                                                {key}
                                                            </kbd>
                                                            {keyIdx < shortcut.keys.length - 1 && (
                                                                <span className="text-gray-400 text-xs mx-1">+</span>
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                            Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-[10px] font-mono shadow-sm border border-gray-200 dark:border-gray-600">?</kbd> to toggle this dialog
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShortcutsModal;
