import React from 'react'
import './nav.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {FaToolbox} from 'react-icons/fa'
import {useState} from 'react'

const Nav = () => {
  const {activeMav, setActiveNav} = useState('#');
  return (
    <nav>
      <a href="#home" onClick={() => setActiveNav('#home')} className={activeMav === '#home' ? 'active' : ''}><AiOutlineHome/></a>
      <a href="#about" onClick={() => setActiveNav('#about')} className={activeMav === '#about' ? 'active' : ''}><AiOutlineUser/></a>
      <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeMav === '#experience' ? 'active' : ''}><RiServiceLine/></a>
   
      <a href="#portfolio" onClick={() => setActiveNav('#portfolio')} className={activeMav === '#portfolio' ? 'active' : ''}><FaToolbox/></a>
      <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeMav === '#contact' ? 'active' : ''}><BiMessageSquareDetail/></a>
    </nav>
  )
}

export default Nav