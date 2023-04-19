import React from 'react'
import CV from '../../assets/JHAFETCANEPA-CV.pdf'

const CTA = () => {
  return (
    <div className='cta'>
        <a href={CV} download="JHAFETCANEPA-CV.pdf" className='btn'>CV</a>
        <a href="#contact" className='btn btn-primary'>Contactar</a>
    </div>
  )
}

export default CTA