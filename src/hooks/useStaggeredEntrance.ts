import { useMemo } from 'react';

/**
 * Returns a CSS style object with --stagger-index for staggered entrance animations.
 * Respects prefers-reduced-motion by setting delay to 0.
 */
export function useStaggeredEntrance() {
    const prefersReducedMotion = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    const getStaggerStyle = (index: number): React.CSSProperties => ({
        '--stagger-index': prefersReducedMotion ? 0 : index,
    } as React.CSSProperties);

    const getStaggerDelay = (index: number): number =>
        prefersReducedMotion ? 0 : index * 60;

    return { getStaggerStyle, getStaggerDelay, prefersReducedMotion };
}

export default useStaggeredEntrance;
