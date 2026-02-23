import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

/**
 * Mobile-optimized bottom sheet pattern.
 * On desktop (≥768px), renders as a centered modal.
 * On mobile (<768px), slides up from the bottom.
 */
export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Sheet — slides up on mobile, centered on desktop */}
            <div
                ref={sheetRef}
                className="
          absolute
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:max-w-lg md:w-full md:max-h-[80vh] md:rounded-2xl
          bottom-0 left-0 right-0
          max-h-[85vh] rounded-t-3xl
          bg-white dark:bg-zinc-900
          shadow-2xl border border-gray-200 dark:border-white/10
          flex flex-col
          animate-slide-in-from-bottom md:animate-scale-in
        "
                role="dialog"
                aria-label={title}
                aria-modal="true"
            >
                {/* Handle bar (mobile only) */}
                <div className="md:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors focus-ring"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BottomSheet;
