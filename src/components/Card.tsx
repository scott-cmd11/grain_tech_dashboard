import React from 'react';

type CardVariant = 'default' | 'glass' | 'elevated';
type CardHover = 'lift' | 'glow' | 'none';

interface CardProps {
    variant?: CardVariant;
    hover?: CardHover;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    as?: 'div' | 'button' | 'article';
    staggerIndex?: number;
    animated?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
    default: 'bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5',
    glass: 'glass rounded-2xl',
    elevated: 'bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/60 dark:shadow-black/30',
};

const hoverClasses: Record<CardHover, string> = {
    lift: 'card-hover-lift',
    glow: 'card-hover-glow',
    none: '',
};

const baseBoxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';

export function Card({
    variant = 'default',
    hover = 'lift',
    className = '',
    children,
    onClick,
    as: Component = 'div',
    staggerIndex,
    animated = false,
}: CardProps) {
    const staggerStyle = animated && staggerIndex !== undefined
        ? { '--stagger-index': staggerIndex, boxShadow: baseBoxShadow } as React.CSSProperties
        : { boxShadow: baseBoxShadow };

    return (
        <Component
            className={`
        ${variantClasses[variant]}
        ${hoverClasses[hover]}
        ${animated ? 'stagger-fade-up' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        transition-all duration-500 ease-out
        focus-ring
        ${className}
      `.trim().replace(/\s+/g, ' ')}
            style={staggerStyle}
            onClick={onClick}
            {...(Component === 'button' ? { type: 'button' as const } : {})}
        >
            {children}
        </Component>
    );
}

interface CardSectionProps {
    className?: string;
    children: React.ReactNode;
}

export function CardHeader({ className = '', children }: CardSectionProps) {
    return (
        <div className={`px-6 pt-6 pb-2 ${className}`}>
            {children}
        </div>
    );
}

export function CardBody({ className = '', children }: CardSectionProps) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ className = '', children }: CardSectionProps) {
    return (
        <div className={`px-6 pb-6 pt-2 border-t border-gray-100 dark:border-white/5 ${className}`}>
            {children}
        </div>
    );
}

export default Card;
