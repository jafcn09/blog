import React, { useState, useEffect, useCallback } from 'react'
import './portfolio.css'
import { useTranslation } from 'react-i18next'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa'
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
import IMG15 from '../../assets/portafolio15.jpg'
import IMG16 from '../../assets/portafolio16.jpg'

const Portfolio = () => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

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

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const pauseAutoplay = () => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        handleNext()
      } else {
        handlePrev()
      }
      pauseAutoplay()
    }
  }

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(handleNext, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, handleNext])

  return (
    <section id='portfolio' className='portfolio'>
      <h2>{t('portfolio.title')}</h2>

      <div className='container portfolio__wrapper'>
        <button
          className='portfolio__btn portfolio__btn--prev'
          onClick={() => { handlePrev(); pauseAutoplay() }}
          title='Previous'
        >
          <MdChevronLeft />
        </button>

        <div
          className='portfolio__carousel'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className='portfolio__slides'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className='portfolio__slide'>
                <div
                  className='portfolio__card'
                  onClick={() => setSelectedProject(project)}
                >
                  <div className='portfolio__image-container'>
                    <img src={project.image} alt={project.title} />
                    <div className='portfolio__badge'>
                      <FaCode />
                      <span>Proyecto</span>
                    </div>
                  </div>
                  <div className='portfolio__content'>
                    <h3 className='portfolio__title'>{project.title}</h3>
                    <p className='portfolio__subtitle'>{project.description}</p>
                    <div className='portfolio__technologies'>
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className='portfolio__tech-tag'>{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className='portfolio__tech-tag'>+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    <button className='portfolio__view-btn'>
                      <FaExternalLinkAlt />
                      <span>Ver Detalles</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className='portfolio__btn portfolio__btn--next'
          onClick={() => { handleNext(); pauseAutoplay() }}
          title='Next'
        >
          <MdChevronRight />
        </button>
      </div>

      <div className='portfolio__indicators'>
        {projects.map((_, index) => (
          <button
            key={index}
            className={`portfolio__indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className='portfolio__progress'>
        <div
          className='portfolio__progress-bar'
          style={{
            width: `${((currentIndex + 1) / projects.length) * 100}%`
          }}
        />
      </div>

      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

export default Portfolio
