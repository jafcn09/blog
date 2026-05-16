import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from '../../context/ThemeContext'
import './preloader.css'

const Preloader = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const [chartData, setChartData] = useState([
    { value: 0, delay: 0 },
    { value: 0, delay: 100 },
    { value: 0, delay: 200 },
    { value: 0, delay: 300 },
    { value: 0, delay: 400 },
  ])

  const { t, i18n } = useTranslation()
  const { isDark } = useContext(ThemeContext)

  useEffect(() => {
    // Animate chart bars
    const chartTimers = chartData.map((bar, index) => {
      return setTimeout(() => {
        setChartData(prev => {
          const newData = [...prev]
          newData[index] = { ...newData[index], value: 60 + Math.random() * 40 }
          return newData
        })
      }, bar.delay)
    })

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setShowWelcome(true)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 150)

    // Complete loading
    const timer = setTimeout(() => {
      setTimeout(() => {
        setIsLoading(false)
        if (onLoadComplete) {
          onLoadComplete()
        }
      }, showWelcome ? 800 : 0)
    }, 3000)

    return () => {
      chartTimers.forEach(timer => clearTimeout(timer))
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [onLoadComplete])

  if (!isLoading) return null

  const welcomeText = i18n.language === 'es' ? 'Bienvenido' : 'Welcome'

  return (
    <div className={`preloader ${isDark ? 'dark' : 'light'}`}>
      <div className='preloader__container'>
        {!showWelcome ? (
          <>
            <div className='preloader__chart'>
              <div className='preloader__bars'>
                {chartData.map((bar, index) => (
                  <div
                    key={index}
                    className='preloader__bar'
                    style={{
                      height: `${bar.value}%`,
                      animationDelay: `${bar.delay}ms`
                    }}
                  />
                ))}
              </div>
              <div className='preloader__chart-line'></div>
            </div>

            <div className='preloader__info'>
              <div className='preloader__percentage'>
                {Math.round(Math.min(progress, 100))}
                <span className='preloader__percent-symbol'>%</span>
              </div>
              <div className='preloader__loading-text'>
                {i18n.language === 'es' ? 'Cargando' : 'Loading'}
                <span className='preloader__dots-animate'>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className='preloader__welcome'>
            <h1 className='preloader__welcome-text'>{welcomeText}</h1>
            <div className='preloader__welcome-subtitle'>{i18n.language === 'es' ? 'Usuario' : 'User'}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Preloader
