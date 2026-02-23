import { useState, useEffect, useMemo } from 'react';

/**
 * Animated counter hook — smoothly counts from 0 to target.
 * Respects prefers-reduced-motion by returning the target immediately.
 */
export function useAnimatedCounter(target: number, duration: number = 1500): number {
    const prefersReducedMotion = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    const [count, setCount] = useState(prefersReducedMotion ? target : 0);

    useEffect(() => {
        if (prefersReducedMotion) {
            setCount(target);
            return;
        }

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [target, duration, prefersReducedMotion]);

    return count;
}

export default useAnimatedCounter;
