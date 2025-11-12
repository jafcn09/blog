import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import {BsFacebook} from 'react-icons/bs'
import {BiCode} from 'react-icons/bi'

const HeaderSocial = () => {
  return (
    <div className='header__socials'>
        <a href="https://www.linkedin.com/in/jafetcanepa/" target="_blank"><BsLinkedin/></a>
        <a href="https://github.com/jafcn09" target="_blank"><BsGithub/></a>
        <a href="https://coderesolution.pe/" target="_blank"><BiCode/></a>
    </div>
  )
}

export default HeaderSocial