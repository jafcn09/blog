import React from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import './headerControls.css'

const HeaderControls = () => {
  const { i18n } = useTranslation()
  const { isDark, toggleTheme } = useTheme()

  const changeLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
  }

  return (
    <div className='header__controls'>
      <button
        className="header__control-btn header__theme-btn"
        onClick={toggleTheme}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <BsSun /> : <BsMoon />}
      </button>

      <button
        className="header__control-btn header__lang-btn"
        onClick={changeLanguage}
        title={i18n.language === 'es' ? 'English' : 'Español'}
      >
        {i18n.language.toUpperCase()}
      </button>
    </div>
  )
}

export default HeaderControls
