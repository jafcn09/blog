import { useState, useEffect, useRef } from 'react';

export const useSkeletonLoader = (delay = 800) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasLoaded) {
                    setTimeout(() => {
                        setIsLoading(false);
                        setHasLoaded(true);
                    }, delay);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay, hasLoaded]);

    return { ref, isLoading };
};