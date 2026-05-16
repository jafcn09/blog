import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
    children,
    animation = 'fadeInUp',
    delay = 0,
    duration = 800,
    threshold = 0.1,
    once = true,
    className = '',
    style = {}
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && (!hasAnimated.current || !once)) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                } else if (!once && !entry.isIntersecting) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        const current = ref.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [threshold, once]);

    const animations = {
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 }
        },
        fadeInUp: {
            initial: { opacity: 0, transform: 'translateY(30px)' },
            animate: { opacity: 1, transform: 'translateY(0)' }
        },
        fadeInDown: {
            initial: { opacity: 0, transform: 'translateY(-30px)' },
            animate: { opacity: 1, transform: 'translateY(0)' }
        },
        fadeInLeft: {
            initial: { opacity: 0, transform: 'translateX(-30px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        fadeInRight: {
            initial: { opacity: 0, transform: 'translateX(30px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        scaleIn: {
            initial: { opacity: 0, transform: 'scale(0.9)' },
            animate: { opacity: 1, transform: 'scale(1)' }
        },
        rotateIn: {
            initial: { opacity: 0, transform: 'rotate(-10deg)' },
            animate: { opacity: 1, transform: 'rotate(0)' }
        }
    };

    const selectedAnimation = animations[animation] || animations.fadeInUp;

    const animationStyle = {
        ...style,
        ...(isVisible ? selectedAnimation.animate : selectedAnimation.initial),
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: 'transform, opacity'
    };

    return (
        <div
            ref={ref}
            className={className}
            style={animationStyle}
        >
            {children}
        </div>
    );
};

export const StaggerChildren = ({
    children,
    staggerDelay = 100,
    animation = 'fadeInUp',
    threshold = 0.1,
    className = '',
    style = {}
}) => {
    return (
        <div className={className} style={style}>
            {React.Children.map(children, (child, index) => (
                <ScrollReveal
                    animation={animation}
                    delay={index * staggerDelay}
                    threshold={threshold}
                >
                    {child}
                </ScrollReveal>
            ))}
        </div>
    );
};

export default ScrollReveal;