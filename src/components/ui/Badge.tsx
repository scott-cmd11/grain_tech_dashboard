interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'accent' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md';
    className?: string;
}

const variantClasses = {
    default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    accent: 'bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    error: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
};

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center font-medium rounded-md
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
        >
            {children}
        </span>
    );
}
