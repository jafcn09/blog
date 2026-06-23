import React, { useState, useEffect } from 'react'
import './nav.css'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { RiServiceLine } from 'react-icons/ri'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FaToolbox } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const NAV_ITEMS = [
  { href: '#header',     icon: <AiOutlineHome />,          label: 'Inicio' },
  { href: '#about',      icon: <AiOutlineUser />,          label: 'Sobre mí' },
  { href: '#experience', icon: <RiServiceLine />,          label: 'Skills' },
  { href: '#portfolio',  icon: <FaToolbox />,              label: 'Portafolio' },
  { href: '#contact',    icon: <BiMessageSquareDetail />,  label: 'Contacto' }
]

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#header')
  const [hideNav, setHideNav] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer')
      if (footer) {
        setHideNav(footer.getBoundingClientRect().top < window.innerHeight)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${hideNav ? 'nav--hidden' : ''}`}>
      <div className='nav__links'>
        {NAV_ITEMS.map(({ href, icon, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setActiveNav(href)}
            className={`nav__link${activeNav === href ? ' active' : ''}`}
          >
            {icon}
            <span className='nav__tooltip'>{label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Nav
