import type { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    timestamp?: string;
    action?: ReactNode;
}

export function PageHeader({ title, description, timestamp, action }: PageHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
                {(action || timestamp) && (
                    <div className="flex items-center gap-3 shrink-0">
                        {timestamp && (
                            <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                                {timestamp}
                            </span>
                        )}
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}
