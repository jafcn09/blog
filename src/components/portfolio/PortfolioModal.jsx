import React from 'react'
import { MdClose } from 'react-icons/md'
import { FiExternalLink } from 'react-icons/fi'
import './portfolioModal.css'

const PortfolioModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className='portfolio-modal__overlay' onClick={onClose}>
      <div className='portfolio-modal__content' onClick={(e) => e.stopPropagation()}>
        <button className='portfolio-modal__close' onClick={onClose} title='Close'>
          <MdClose />
        </button>

        <div className='portfolio-modal__image'>
          <img src={project.image} alt={project.title} />
        </div>

        <div className='portfolio-modal__body'>
          <h2 className='portfolio-modal__title'>{project.title}</h2>

          <div className='portfolio-modal__section'>
            <h3>Descripción</h3>
            <p>{project.fullDescription}</p>
          </div>

          <div className='portfolio-modal__section'>
            <h3>Tecnologías Utilizadas</h3>
            <div className='portfolio-modal__technologies'>
              {project.technologies && (
                Array.isArray(project.technologies)
                  ? project.technologies.map((tech, index) => (
                      <span key={index} className='portfolio-modal__tech-badge'>
                        {tech}
                      </span>
                    ))
                  : Object.values(project.technologies).map((tech, index) => (
                      <span key={index} className='portfolio-modal__tech-badge'>
                        {tech}
                      </span>
                    ))
              )}
            </div>
          </div>

          <div className='portfolio-modal__actions'>
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-primary portfolio-modal__btn'
            >
              <FiExternalLink /> Visitar Proyecto
            </a>
            <button className='btn portfolio-modal__btn' onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioModal
