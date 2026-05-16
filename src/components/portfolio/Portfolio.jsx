import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './portfolio.css'
import { useTranslation } from 'react-i18next'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa'
import PortfolioModal from './PortfolioModal'
import LazyImage from '../common/LazyImage'
import SkeletonLoader from '../common/SkeletonLoader'

import VIDEOTRANSCRIBE from '../../assets/videotranscribe.jpg'
import PRISMPR from '../../assets/prismpr.jpg'
import APPOINTMENTS from '../../assets/appointments.jpg'
import CODERESOLUTIONS from '../../assets/coderesolutions.png'
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
import SERIOUSGAME from '../../assets/seriousgame.jpg'

const Portfolio = React.memo(() => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [selectedTech, setSelectedTech] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [techIndex, setTechIndex] = useState(0)
  const [previousTech, setPreviousTech] = useState(null)
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false)

  // Memoize getTechnologies function to prevent recreation on every render
  const getTechnologies = useCallback((index) => {
    const techs = t(`portfolio.projects.${index}.technologies`, { returnObjects: true })
    return Array.isArray(techs) ? techs : Object.values(techs || {})
  }, [t])

  // Extract main technologies only (not all)
  const allTechnologies = useMemo(() => {
    // Solo mostrar las tecnologías principales
    return ['All', 'React', 'Angular', 'Python', 'Node.js', 'Golang', 'NestJS', 'Docker', 'AWS']
  }, [])

  // Memoize projects array to prevent recreation on every render
  const projects = useMemo(() => [
    {
      id: 1,
      title: t('portfolio.projects.0.title'),
      description: t('portfolio.projects.0.description'),
      fullDescription: t('portfolio.projects.0.fullDescription'),
      technologies: getTechnologies(0),
      image: VIDEOTRANSCRIBE,
      link: 'https://videotranscribe.untumbes.edu.pe/'
    },
    {
      id: 2,
      title: t('portfolio.projects.1.title'),
      description: t('portfolio.projects.1.description'),
      fullDescription: t('portfolio.projects.1.fullDescription'),
      technologies: getTechnologies(1),
      image: PRISMPR,
      link: 'https://prisms-app.onrender.com/'
    },
    {
      id: 3,
      title: t('portfolio.projects.2.title'),
      description: t('portfolio.projects.2.description'),
      fullDescription: t('portfolio.projects.2.fullDescription'),
      technologies: getTechnologies(2),
      image: APPOINTMENTS,
      link: 'https://sistema-citas.com/'
    },
    {
      id: 4,
      title: t('portfolio.projects.3.title'),
      description: t('portfolio.projects.3.description'),
      fullDescription: t('portfolio.projects.3.fullDescription'),
      technologies: getTechnologies(3),
      image: CODERESOLUTIONS,
      link: 'https://coderesolutions.com/'
    },
    {
      id: 5,
      title: t('portfolio.projects.4.title'),
      description: t('portfolio.projects.4.description'),
      fullDescription: t('portfolio.projects.4.fullDescription'),
      technologies: getTechnologies(4),
      image: IMG2,
      link: 'https://www.rover.com/'
    },
    {
      id: 6,
      title: t('portfolio.projects.5.title'),
      description: t('portfolio.projects.5.description'),
      fullDescription: t('portfolio.projects.5.fullDescription'),
      technologies: getTechnologies(5),
      image: IMG3,
      link: 'https://smiledu.com/'
    },
    {
      id: 7,
      title: t('portfolio.projects.6.title'),
      description: t('portfolio.projects.6.description'),
      fullDescription: t('portfolio.projects.6.fullDescription'),
      technologies: getTechnologies(6),
      image: IMG4,
      link: 'https://rosar.netlify.app/'
    },
    {
      id: 8,
      title: t('portfolio.projects.7.title'),
      description: t('portfolio.projects.7.description'),
      fullDescription: t('portfolio.projects.7.fullDescription'),
      technologies: getTechnologies(7),
      image: IMG5,
      link: 'https://www.clinicaluzdeesperanza.pe/'
    },
    {
      id: 9,
      title: t('portfolio.projects.8.title'),
      description: t('portfolio.projects.8.description'),
      fullDescription: t('portfolio.projects.8.fullDescription'),
      technologies: getTechnologies(8),
      image: IMG6,
      link: 'https://www.munitumbes.gob.pe/web-mpt/'
    },
    {
      id: 10,
      title: t('portfolio.projects.9.title'),
      description: t('portfolio.projects.9.description'),
      fullDescription: t('portfolio.projects.9.fullDescription'),
      technologies: getTechnologies(9),
      image: IMG7,
      link: 'https://servizisolarisrls.com/'
    },
    {
      id: 11,
      title: t('portfolio.projects.10.title'),
      description: t('portfolio.projects.10.description'),
      fullDescription: t('portfolio.projects.10.fullDescription'),
      technologies: getTechnologies(10),
      image: IMG9,
      link: 'https://servizisolarisrls.com/'
    },
    {
      id: 12,
      title: t('portfolio.projects.11.title'),
      description: t('portfolio.projects.11.description'),
      fullDescription: t('portfolio.projects.11.fullDescription'),
      technologies: getTechnologies(11),
      image: IMG10,
      link: 'https://repositorio.untumbes.edu.pe/'
    },
    {
      id: 13,
      title: t('portfolio.projects.12.title'),
      description: t('portfolio.projects.12.description'),
      fullDescription: t('portfolio.projects.12.fullDescription'),
      technologies: getTechnologies(12),
      image: IMG11,
      link: 'https://untumbes.edu.pe/'
    },
    {
      id: 14,
      title: t('portfolio.projects.13.title'),
      description: t('portfolio.projects.13.description'),
      fullDescription: t('portfolio.projects.13.fullDescription'),
      technologies: getTechnologies(13),
      image: IMG16,
      link: 'https://tramite-documentario.pages.dev/'
    },
    {
      id: 15,
      title: t('portfolio.projects.14.title'),
      description: t('portfolio.projects.14.description'),
      fullDescription: t('portfolio.projects.14.fullDescription'),
      technologies: getTechnologies(14),
      image: IMG12,
      link: 'https://cybertesis.unmsm.edu.pe/'
    },
    {
      id: 16,
      title: t('portfolio.projects.15.title'),
      description: t('portfolio.projects.15.description'),
      fullDescription: t('portfolio.projects.15.fullDescription'),
      technologies: getTechnologies(15),
      image: IMG13,
      link: 'https://play.google.com/store/search?q=app%20usil&c=apps&hl=es_PE'
    },
    {
      id: 17,
      title: t('portfolio.projects.16.title'),
      description: t('portfolio.projects.16.description'),
      fullDescription: t('portfolio.projects.16.fullDescription'),
      technologies: getTechnologies(16),
      image: SERIOUSGAME,
      webLink: t('portfolio.projects.16.webLink'),
      playStoreLink: t('portfolio.projects.16.playStoreLink'),
      link: 'https://serious-game.42web.io/main/views/index.php'
    }
  ], [t, getTechnologies])

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (selectedTech === 'All') return projects
    return projects.filter(project =>
      project.technologies.some(tech => tech === selectedTech)
    )
  }, [projects, selectedTech])

  // Reset currentIndex when filter changes with transition effect
  useEffect(() => {
    setIsFilterTransitioning(true)
    setCurrentIndex(0)

    // Reset transition state after animation
    const timer = setTimeout(() => {
      setIsFilterTransitioning(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [selectedTech])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)
  }, [filteredProjects.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }, [filteredProjects.length])

  // Memoize handleIndicatorClick to prevent recreation on every render
  const handleIndicatorClick = useCallback((index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  // Memoize pauseAutoplay function to prevent recreation on every render
  const pauseAutoplay = useCallback(() => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  // Memoize touch handlers for mobile swipe to prevent recreation on every render
  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
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
  }, [touchStart, touchEnd, handleNext, handlePrev, pauseAutoplay])

  // Memoize modal close handler to prevent recreation on every render
  const handleCloseModal = useCallback(() => setSelectedProject(null), [])

  // Memoize project selection handler to prevent recreation on every render
  const handleProjectSelect = useCallback((project) => setSelectedProject(project), [])

  // Memoize technology selection handler to prevent recreation on every render
  const handleTechSelect = useCallback((tech) => {
    setPreviousTech(selectedTech)
    setSelectedTech(tech)
    setTechIndex(allTechnologies.indexOf(tech))

    // Limpiar la clase fading-out después de 800ms
    setTimeout(() => {
      setPreviousTech(null)
    }, 800)
  }, [allTechnologies, selectedTech])

  // Autoplay for projects
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(handleNext, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, handleNext])

  // Autoplay for technology filters
  useEffect(() => {
    const interval = setInterval(() => {
      setTechIndex(prev => {
        const nextIndex = (prev + 1) % allTechnologies.length
        setPreviousTech(selectedTech)
        setSelectedTech(allTechnologies[nextIndex])

        // Limpiar la clase fading-out después de 800ms
        setTimeout(() => {
          setPreviousTech(null)
        }, 800)

        return nextIndex
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [allTechnologies, selectedTech])

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id='portfolio' className='portfolio'>
      <h2>{t('portfolio.title')}</h2>

      {/* Technology Filter Bar */}
      <div className='portfolio__filter'>
        <div className='portfolio__filter-container'>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              className={`portfolio__filter-btn ${
                selectedTech === tech ? 'active' : ''
              } ${
                previousTech === tech ? 'fading-out' : ''
              }`}
              onClick={() => handleTechSelect(tech)}
            >
              {tech === 'All' ? t('portfolio.filter_all') : tech}
            </button>
          ))}
        </div>
      </div>

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
          {isLoading ? (
            <div className='portfolio__slides'>
              <div className='portfolio__slide'>
                <div className='portfolio__card'>
                  <div className='portfolio__image-container'>
                    <SkeletonLoader variant="image" height="400px" />
                  </div>
                  <div className='portfolio__content' style={{padding: '1.5rem'}}>
                    <SkeletonLoader variant="title" width="80%" />
                    <div style={{marginTop: '1rem'}}>
                      <SkeletonLoader variant="text" count={2} />
                    </div>
                    <div className='portfolio__technologies' style={{marginTop: '1rem'}}>
                      <SkeletonLoader variant="button" width="80px" />
                      <SkeletonLoader variant="button" width="60px" />
                      <SkeletonLoader variant="button" width="70px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`portfolio__slides ${isFilterTransitioning ? 'filtering' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`portfolio__slide ${isFilterTransitioning ? 'slide-entering' : ''}`}
                  style={{
                    animationDelay: isFilterTransitioning ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div
                    className='portfolio__card'
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className='portfolio__image-container'>
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="portfolio__image"
                        effect="blur"
                        threshold={50}
                        wrapperClassName="portfolio__lazy-wrapper"
                      />
                      <div className='portfolio__year-badge'>
                        <FaCode />
                        <span>Proyecto</span>
                      </div>
                    </div>
                    <div className='portfolio__content'>
                      <h3 className='portfolio__title'>{project.title}</h3>
                      <p className='portfolio__subtitle'>{project.description}</p>
                      <div className='portfolio__details'>
                        <div className='portfolio__detail'>
                          <FaCode />
                          <span>{project.technologies.slice(0, 2).join(', ')}</span>
                        </div>
                        <div className='portfolio__detail'>
                          <FaExternalLinkAlt />
                          <span>{t('portfolio.website')}</span>
                        </div>
                      </div>
                      <button className='portfolio__view-btn'>
                        <FaCode />
                        <span>Ver Detalles</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        {filteredProjects.map((_, index) => (
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
            width: `${((currentIndex + 1) / filteredProjects.length) * 100}%`
          }}
        />
      </div>

      <PortfolioModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  )
})

Portfolio.displayName = 'Portfolio'

export default Portfolio