import React, { useState, useEffect } from 'react'
import './preloader.css'

const Preloader = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (onLoadComplete) {
        onLoadComplete()
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [onLoadComplete])

  if (!isLoading) return null

  return (
    <div className='preloader'>
      <div className='preloader__container'>
        <div className='preloader__spinner'>
          <div className='preloader__spinner-circle'></div>
          <div className='preloader__spinner-circle'></div>
          <div className='preloader__spinner-circle'></div>
        </div>
        <p className='preloader__text'>Cargando...</p>
      </div>
    </div>
  )
}

export default Preloader
