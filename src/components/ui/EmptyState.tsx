import type { ReactNode } from 'react';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {icon && (
                <div className="mb-4 text-zinc-300 dark:text-zinc-600">
                    {icon}
                </div>
            )}
            <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                {title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
                {description}
            </p>
            {action}
        </div>
    );
}
