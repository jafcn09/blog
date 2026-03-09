import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './lazyImage.css'

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderSrc = null,
  effect = 'blur',
  threshold = 100,
  height = 'auto',
  width = '100%',
  wrapperClassName = '',
  onLoad = () => {},
  onError = () => {}
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Create a lightweight placeholder image (1x1 pixel transparent PNG)
  const defaultPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

  const handleLoad = () => {
    setImageLoaded(true)
    onLoad()
  }

  const handleError = () => {
    setImageError(true)
    onError()
  }

  const createBlurDataURL = (width = 10, height = 10) => {
    // Create a simple blurred placeholder
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    // Create a gradient for a nice placeholder effect
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f0f0f0')
    gradient.addColorStop(1, '#e0e0e0')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    return canvas.toDataURL()
  }

  return (
    <div className={`lazy-image-wrapper ${wrapperClassName}`}>
      {!imageLoaded && !imageError && (
        <div className="lazy-image-skeleton">
          <div className="lazy-image-skeleton-animation"></div>
        </div>
      )}

      {imageError ? (
        <div className="lazy-image-error">
          <div className="lazy-image-error-icon">📷</div>
          <span>Image failed to load</span>
        </div>
      ) : (
        <LazyLoadImage
          src={src}
          alt={alt}
          className={`lazy-image ${className} ${imageLoaded ? 'loaded' : ''}`}
          placeholderSrc={placeholderSrc || createBlurDataURL()}
          effect={effect}
          threshold={threshold}
          height={height}
          width={width}
          onLoad={handleLoad}
          onError={handleError}
          wrapperClassName="lazy-image-container"
        />
      )}
    </div>
  )
}

export default LazyImage