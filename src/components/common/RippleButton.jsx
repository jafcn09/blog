import React, { useState } from 'react';
import './RippleButton.css';

const RippleButton = ({
    children,
    onClick,
    className = '',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    rippleColor = 'rgba(255, 255, 255, 0.6)',
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const createRipple = (event) => {
        if (disabled) return;

        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple = {
            x,
            y,
            size,
            id: Date.now()
        };

        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
    };

    const handleClick = (event) => {
        createRipple(event);
        if (onClick) onClick(event);
    };

    const sizeClasses = {
        small: 'ripple-btn--small',
        medium: 'ripple-btn--medium',
        large: 'ripple-btn--large'
    };

    const variantClasses = {
        primary: 'ripple-btn--primary',
        secondary: 'ripple-btn--secondary',
        tertiary: 'ripple-btn--tertiary',
        ghost: 'ripple-btn--ghost'
    };

    return (
        <button
            className={`ripple-btn ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'ripple-btn--disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            <span className="ripple-btn__content">
                {children}
            </span>
            <span className="ripple-btn__ripples">
                {ripples.map(ripple => (
                    <span
                        key={ripple.id}
                        className="ripple-btn__ripple"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size,
                            background: rippleColor
                        }}
                    />
                ))}
            </span>
        </button>
    );
};

export default RippleButton;