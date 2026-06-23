import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

const NIGHT_START = 22
const DAY_START = 7

const isNightTime = () => {
  const hour = new Date().getHours()
  return hour >= NIGHT_START || hour < DAY_START
}

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved === 'dark'
  return isNightTime()
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme)
  const [userOverride, setUserOverride] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || saved === 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    if (userOverride) return

    setIsDark(isNightTime())
    const interval = setInterval(() => setIsDark(isNightTime()), 60000)
    return () => clearInterval(interval)
  }, [userOverride])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
    setUserOverride(true)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
