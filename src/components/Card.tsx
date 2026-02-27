import React from 'react';

type CardVariant = 'default' | 'ghost';
type CardHover = 'subtle' | 'none';

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
    default: 'bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800',
    ghost: 'rounded-lg',
};

const hoverClasses: Record<CardHover, string> = {
    subtle: 'hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-[border-color,box-shadow] duration-150',
    none: '',
};

export function Card({
    variant = 'default',
    hover = 'subtle',
    className = '',
    children,
    onClick,
    as: Component = 'div',
    staggerIndex,
    animated = false,
}: CardProps) {
    const staggerStyle = animated && staggerIndex !== undefined
        ? { '--stagger-index': staggerIndex } as React.CSSProperties
        : {};

    return (
        <Component
            className={`
                ${variantClasses[variant]}
                ${hoverClasses[hover]}
                ${animated ? 'stagger-fade-up' : ''}
                ${onClick ? 'cursor-pointer' : ''}
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
        <div className={`px-5 pt-5 pb-2 ${className}`}>
            {children}
        </div>
    );
}

export function CardBody({ className = '', children }: CardSectionProps) {
    return (
        <div className={`px-5 py-3 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ className = '', children }: CardSectionProps) {
    return (
        <div className={`px-5 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800 ${className}`}>
            {children}
        </div>
    );
}

export default Card;
