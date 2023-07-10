import React from 'react'
import CV from '../../assets/CURRICULUMVITAE-JHAFETCANEPAMACEDA.pdf'

const CTA = () => {
  return (
    <div className='cta'>
        <a href={CV} download="CURRICULUMVITAE-JHAFETCANEPAMACEDA.pdf" className='btn'>CV</a>
        <a href="#contact" className='btn btn-primary'>Contactar</a>
    </div>
  )
}

export default CTA