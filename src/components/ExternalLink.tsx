import React from 'react';
import { ExternalLink as LucideExternalLink } from 'lucide-react';

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    showIcon?: boolean;
};

export function ExternalLink({ href, children, showIcon = true, className, ...rest }: ExternalLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            {...rest}
        >
            {children}
            {showIcon && <LucideExternalLink className="w-3 h-3 ml-1 inline-block" />}
        </a>
    );
}
