import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast, type ToastType } from '../context/ToastContext';

const toastStyles: Record<ToastType, { bg: string; border: string; icon: typeof CheckCircle }> = {
    success: {
        bg: 'bg-green-50 dark:bg-green-900/30',
        border: 'border-green-200 dark:border-green-800',
        icon: CheckCircle,
    },
    error: {
        bg: 'bg-red-50 dark:bg-red-900/30',
        border: 'border-red-200 dark:border-red-800',
        icon: AlertCircle,
    },
    warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/30',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: AlertTriangle,
    },
    info: {
        bg: 'bg-blue-50 dark:bg-blue-900/30',
        border: 'border-blue-200 dark:border-blue-800',
        icon: Info,
    },
};

const iconColors: Record<ToastType, string> = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
};

export function ToastContainer() {
    const { toasts, dismissToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
            {toasts.map((toast) => {
                const style = toastStyles[toast.type];
                const Icon = style.icon;

                return (
                    <div
                        key={toast.id}
                        className={`
              ${style.bg} ${style.border}
              border rounded-lg shadow-lg p-4
              flex items-start gap-3
              animate-slide-in-from-bottom
            `}
                    >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[toast.type]}`} />
                        <p className="text-sm text-gray-800 dark:text-gray-200 flex-1">
                            {toast.message}
                        </p>
                        <button
                            onClick={() => dismissToast(toast.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default ToastContainer;
