import React from 'react'
import './about.css'
import ME from '../../assets/work1.jpg'
import {FaAward} from 'react-icons/fa'
import {GiBrain} from 'react-icons/gi'
import {VscFolderLibrary} from 'react-icons/vsc'

const About = () => {
  return (
    <section id='about'>
      <h5>Un Poco</h5>
      
      <h2>Sobre Mi</h2>
      <div className='container about__container'>
        <div className='about__me'>
          <div className='about__me-image'>
            <img unselectable='on' src={ME} alt="About" />
          </div>
        </div>

        <div className='about__content'>
          <div className='about__cards'>
           <article className='about__card'>
             <GiBrain className='about__icon'/>
             <h5>Habilidades</h5>
             <small>3 años programando</small>
           </article>
           <article className='about__card'>
             <FaAward className='about__icon'/>
             <h5>Certificaciones</h5>
             <small>20 certificaciones internacionales recibidas</small>
           </article>
           <article className='about__card'>
             <VscFolderLibrary className='about__icon'/>
             <h5>Proyectos</h5>
             <small>+10 proyectos realizados</small>
           </article>
          </div>
          <br/>
          <h3>Mi biografía</h3>
          <p>
          Desarrollador de software con grandes cualides en el mundo de diseño y también creador de aplicaciones responsivas, trabajando con muchas herramientas Tecnológicos para la industrias del desarrollo.
          </p>
          <h3>Perfil Profesional</h3>
          <p>
         Trabajar de forma satisfactoria para las empresas de tecnologia.
          </p>

          <a href="#contact" className='btn btn-primary'>Contactar</a>
        </div>
      </div>
    </section>
  )
}

export default About