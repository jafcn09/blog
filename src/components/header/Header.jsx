import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/me.jpg'
import HeaderSocial from './HeaderSocial'

const Header = () => {
  return (
    <header>
      <div id='header' className="container header__container">
        <h5>Hola, Soy</h5>
        <h1>JHAFET CÁNEPA</h1>
        <h5 className="text-light">DESARROLLADOR DE SOFTWARE</h5>
        <CTA/>
        <HeaderSocial/>

        <div className="me">
          <img unselectable='on' src={ME} alt="me" />
        </div>

        <a href="#contact" className='scroll__down'>Deslizar</a>
      </div>
    </header>
  )
}

export default Header