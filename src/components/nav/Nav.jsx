import React, { useState } from 'react'
import './nav.css'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { RiServiceLine } from 'react-icons/ri'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FaToolbox } from 'react-icons/fa'
import { BsSun, BsMoon } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#header')
  const { i18n } = useTranslation()
  const { isDark, toggleTheme } = useTheme()

  const changeLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
  }

  return (
    <nav className="nav">
      <div className="nav__links">
        <a
          href="#header"
          onClick={() => setActiveNav('#header')}
          className={activeNav === '#header' ? 'nav__link active' : 'nav__link'}
          title="Home"
        >
          <AiOutlineHome/>
        </a>
        <a
          href="#about"
          onClick={() => setActiveNav('#about')}
          className={activeNav === '#about' ? 'nav__link active' : 'nav__link'}
          title="About"
        >
          <AiOutlineUser/>
        </a>
        <a
          href="#experience"
          onClick={() => setActiveNav('#experience')}
          className={activeNav === '#experience' ? 'nav__link active' : 'nav__link'}
          title="Experience"
        >
          <RiServiceLine/>
        </a>
        <a
          href="#portfolio"
          onClick={() => setActiveNav('#portfolio')}
          className={activeNav === '#portfolio' ? 'nav__link active' : 'nav__link'}
          title="Portfolio"
        >
          <FaToolbox/>
        </a>
        <a
          href="#contact"
          onClick={() => setActiveNav('#contact')}
          className={activeNav === '#contact' ? 'nav__link active' : 'nav__link'}
          title="Contact"
        >
          <BiMessageSquareDetail/>
        </a>
      </div>

      <div className="nav__controls">
        <button
          className="nav__control-btn nav__theme-btn"
          onClick={toggleTheme}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <BsSun /> : <BsMoon />}
        </button>
        <button
          className="nav__control-btn nav__lang-btn"
          onClick={changeLanguage}
          title={i18n.language === 'es' ? 'English' : 'Español'}
        >
          {i18n.language.toUpperCase()}
        </button>
      </div>
    </nav>
  )
}

export default Nav