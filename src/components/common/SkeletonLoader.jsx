import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({
    variant = 'text',
    width,
    height,
    borderRadius,
    count = 1,
    className = '',
    animation = 'shimmer'
}) => {
    const getVariantStyles = () => {
        switch(variant) {
            case 'text':
                return {
                    width: width || '100%',
                    height: height || '1.2rem',
                    borderRadius: borderRadius || '4px'
                };
            case 'title':
                return {
                    width: width || '60%',
                    height: height || '2rem',
                    borderRadius: borderRadius || '4px'
                };
            case 'avatar':
                return {
                    width: width || '3rem',
                    height: height || '3rem',
                    borderRadius: borderRadius || '50%'
                };
            case 'image':
                return {
                    width: width || '100%',
                    height: height || '200px',
                    borderRadius: borderRadius || '12px'
                };
            case 'card':
                return {
                    width: width || '100%',
                    height: height || '300px',
                    borderRadius: borderRadius || '16px'
                };
            case 'button':
                return {
                    width: width || '120px',
                    height: height || '40px',
                    borderRadius: borderRadius || '8px'
                };
            case 'paragraph':
                return {
                    width: width || '100%',
                    height: height || '4rem',
                    borderRadius: borderRadius || '4px'
                };
            default:
                return {
                    width: width || '100%',
                    height: height || '1rem',
                    borderRadius: borderRadius || '4px'
                };
        }
    };

    const renderSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < count; i++) {
            skeletons.push(
                <div
                    key={i}
                    className={`skeleton-loader skeleton-loader--${variant} skeleton-loader--${animation} ${className}`}
                    style={getVariantStyles()}
                >
                    <div className="skeleton-loader__shimmer"></div>
                </div>
            );
        }
        return skeletons;
    };

    return (
        <div className="skeleton-loader-wrapper">
            {renderSkeletons()}
        </div>
    );
};

export const SkeletonCard = ({ className = '' }) => (
    <div className={`skeleton-card ${className}`}>
        <SkeletonLoader variant="image" height="180px" />
        <div className="skeleton-card__content">
            <SkeletonLoader variant="title" width="80%" />
            <SkeletonLoader variant="text" count={3} />
            <div className="skeleton-card__footer">
                <SkeletonLoader variant="button" width="100px" />
                <SkeletonLoader variant="text" width="60px" height="1rem" />
            </div>
        </div>
    </div>
);

export const SkeletonArticle = ({ className = '' }) => (
    <article className={`skeleton-article ${className}`}>
        <SkeletonLoader variant="title" width="70%" />
        <div className="skeleton-article__meta">
            <SkeletonLoader variant="avatar" width="2rem" height="2rem" />
            <SkeletonLoader variant="text" width="150px" height="1rem" />
        </div>
        <SkeletonLoader variant="paragraph" count={3} />
    </article>
);

export const SkeletonTable = ({ rows = 5, cols = 4, className = '' }) => (
    <div className={`skeleton-table ${className}`}>
        <div className="skeleton-table__header">
            {Array.from({ length: cols }).map((_, i) => (
                <SkeletonLoader key={i} variant="text" height="2.5rem" />
            ))}
        </div>
        <div className="skeleton-table__body">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="skeleton-table__row">
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <SkeletonLoader key={colIndex} variant="text" height="2rem" />
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default SkeletonLoader;