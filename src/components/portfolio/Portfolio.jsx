import React, { useState, useEffect } from 'react'
import './portfolio.css'
import { useTranslation } from 'react-i18next'
import { FiExternalLink } from 'react-icons/fi'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import PortfolioModal from './PortfolioModal'

import IMG2 from '../../assets/portafolio2.jpeg'
import IMG3 from '../../assets/portafolio3.jpg'
import IMG4 from '../../assets/portafolio4.jpg'
import IMG5 from '../../assets/portafolio5.jpg'
import IMG6 from '../../assets/portafolio6.png'
import IMG7 from '../../assets/portafolio7.jpg'
import IMG9 from '../../assets/portafolio9.jpeg'
import IMG10 from '../../assets/portafolio10.jpg'
import IMG11 from '../../assets/portafolio11.jpg'
import IMG12 from '../../assets/portafolio12.jpg'
import IMG13 from '../../assets/portafolio13.jpg'
import IMG14 from '../../assets/portafolio14.jpeg'
import IMG15 from '../../assets/portafolio15.jpg'
import IMG16 from '../../assets/portafolio16.jpg'

const Portfolio = () => {
  const { t } = useTranslation()
  const [hoveredId, setHoveredId] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const itemsPerPage = 5
  const autoplayInterval = 2000 // 2 segundos

  const getTechnologies = (index) => {
    const techs = t(`portfolio.projects.${index}.technologies`, { returnObjects: true })
    return Array.isArray(techs) ? techs : Object.values(techs || {})
  }

  const projects = [
    {
      id: 1,
      title: t('portfolio.projects.0.title'),
      description: t('portfolio.projects.0.description'),
      fullDescription: t('portfolio.projects.0.fullDescription'),
      technologies: getTechnologies(0),
      image: IMG2,
      link: 'https://www.rover.com/'
    },
    {
      id: 2,
      title: t('portfolio.projects.1.title'),
      description: t('portfolio.projects.1.description'),
      fullDescription: t('portfolio.projects.1.fullDescription'),
      technologies: getTechnologies(1),
      image: IMG3,
      link: 'https://smiledu.com/'
    },
    {
      id: 3,
      title: t('portfolio.projects.2.title'),
      description: t('portfolio.projects.2.description'),
      fullDescription: t('portfolio.projects.2.fullDescription'),
      technologies: getTechnologies(2),
      image: IMG4,
      link: 'https://rosar.netlify.app/'
    },
    {
      id: 4,
      title: t('portfolio.projects.3.title'),
      description: t('portfolio.projects.3.description'),
      fullDescription: t('portfolio.projects.3.fullDescription'),
      technologies: getTechnologies(3),
      image: IMG5,
      link: 'https://www.clinicaluzdeesperanza.pe/'
    },
    {
      id: 5,
      title: t('portfolio.projects.4.title'),
      description: t('portfolio.projects.4.description'),
      fullDescription: t('portfolio.projects.4.fullDescription'),
      technologies: getTechnologies(4),
      image: IMG6,
      link: 'https://www.munitumbes.gob.pe/muni20232026/'
    },
    {
      id: 6,
      title: t('portfolio.projects.5.title'),
      description: t('portfolio.projects.5.description'),
      fullDescription: t('portfolio.projects.5.fullDescription'),
      technologies: getTechnologies(5),
      image: IMG7,
      link: 'https://servizisolarisrls.com/'
    },
    {
      id: 7,
      title: t('portfolio.projects.6.title'),
      description: t('portfolio.projects.6.description'),
      fullDescription: t('portfolio.projects.6.fullDescription'),
      technologies: getTechnologies(6),
      image: IMG9,
      link: 'https://servizisolarisrls.com/'
    },
    {
      id: 8,
      title: t('portfolio.projects.7.title'),
      description: t('portfolio.projects.7.description'),
      fullDescription: t('portfolio.projects.7.fullDescription'),
      technologies: getTechnologies(7),
      image: IMG10,
      link: 'https://repositorio.untumbes.edu.pe/'
    },
    {
      id: 9,
      title: t('portfolio.projects.8.title'),
      description: t('portfolio.projects.8.description'),
      fullDescription: t('portfolio.projects.8.fullDescription'),
      technologies: getTechnologies(8),
      image: IMG11,
      link: 'https://untumbes.edu.pe/'
    },
    {
      id: 10,
      title: t('portfolio.projects.9.title'),
      description: t('portfolio.projects.9.description'),
      fullDescription: t('portfolio.projects.9.fullDescription'),
      technologies: getTechnologies(9),
      image: IMG16,
      link: 'https://tramite-documentario.pages.dev/'
    },
    {
      id: 11,
      title: t('portfolio.projects.10.title'),
      description: t('portfolio.projects.10.description'),
      fullDescription: t('portfolio.projects.10.fullDescription'),
      technologies: getTechnologies(10),
      image: IMG12,
      link: 'https://cybertesis.unmsm.edu.pe/'
    },
    {
      id: 12,
      title: t('portfolio.projects.11.title'),
      description: t('portfolio.projects.11.description'),
      fullDescription: t('portfolio.projects.11.fullDescription'),
      technologies: getTechnologies(11),
      image: IMG13,
      link: 'https://play.google.com/store/search?q=app%20usil&c=apps&hl=es_PE'
    },
    {
      id: 13,
      title: t('portfolio.projects.12.title'),
      description: t('portfolio.projects.12.description'),
      fullDescription: t('portfolio.projects.12.fullDescription'),
      technologies: getTechnologies(12),
      image: IMG15,
      link: 'https://serious-game.42web.io/main/views/index.php'
    }
  ]

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const visibleProjects = projects.slice(currentIndex, currentIndex + itemsPerPage)

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + itemsPerPage >= projects.length ? 0 : prev + itemsPerPage))
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [projects.length, itemsPerPage, autoplayInterval])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage < 0 ? Math.max(0, projects.length - itemsPerPage) : prev - itemsPerPage))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= projects.length ? 0 : prev + itemsPerPage))
  }

  return (
    <section id='portfolio' className='portfolio'>
      <h2>{t('portfolio.title')}</h2>

      <div className='container portfolio__wrapper'>
        <button className='portfolio__btn portfolio__btn--prev' onClick={handlePrev} title='Previous'>
          <MdChevronLeft />
        </button>

        <div className='portfolio__container'>
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className='portfolio__item'
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className='portfolio__item-image'>
                <img src={project.image} alt={project.title} />
                <div className='portfolio__item-overlay'>
                  <div className='portfolio__item-content'>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <button className='btn btn-primary'>
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className='portfolio__btn portfolio__btn--next' onClick={handleNext} title='Next'>
          <MdChevronRight />
        </button>
      </div>

      <div className='portfolio__indicators'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`portfolio__indicator ${currentIndex === index * itemsPerPage ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            title={`Page ${index + 1}`}
          />
        ))}
      </div>

      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

export default Portfolio
