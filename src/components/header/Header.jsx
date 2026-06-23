import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/me.jpg'
import HeaderSocial from './HeaderSocial'
import HeaderControls from './HeaderControls'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header id="header">
      <HeaderControls/>
      <div className="header__bg">
        <div className="header__orb header__orb--1"></div>
        <div className="header__orb header__orb--2"></div>
        <div className="header__orb header__orb--3"></div>
      </div>
      <div className="container header__container">
        <div className="header__content">
          <h5 className="header__greeting">{t('header.greeting')}</h5>
          <h1 className="header__title">JHAFET CÁNEPA</h1>
          <h5 className="header__subtitle">{t('header.title')}</h5>
          <p className="header__description">{t('header.description')}</p>
          <CTA/>
          <HeaderSocial/>
        </div>

        <div className="me">
          <div className="me__glow"></div>
          <div className="me__photo">
            <img unselectable='on' src={ME} alt="me" />
          </div>
        </div>

        <a href="#about" className='scroll__down'>
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
    </header>
  )
}

export default Header