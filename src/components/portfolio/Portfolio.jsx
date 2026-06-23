import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './portfolio.css'
import { useTranslation } from 'react-i18next'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa'
import PortfolioModal from './PortfolioModal'
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
import IMG15 from '../../assets/peru-spatial.svg'
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
  const [previousTech, setPreviousTech] = useState(null)
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false)

  const getTechnologies = useCallback((index) => {
    const techs = t(`portfolio.projects.${index}.technologies`, { returnObjects: true })
    return Array.isArray(techs) ? techs : Object.values(techs || {})
  }, [t])

  const allTechnologies = useMemo(() => (
    ['All', 'React', 'Angular', 'Python', 'Node.js', 'Golang', 'NestJS', 'Docker', 'AWS']
  ), [])

  const projects = useMemo(() => [
    { id: 1,  image: VIDEOTRANSCRIBE, link: 'https://videotranscribe.untumbes.edu.pe/', title: t('portfolio.projects.0.title'),  description: t('portfolio.projects.0.description'),  fullDescription: t('portfolio.projects.0.fullDescription'),  technologies: getTechnologies(0) },
    { id: 2,  image: PRISMPR,         link: 'https://prisms-app.onrender.com/',          title: t('portfolio.projects.1.title'),  description: t('portfolio.projects.1.description'),  fullDescription: t('portfolio.projects.1.fullDescription'),  technologies: getTechnologies(1) },
    { id: 3,  image: APPOINTMENTS,    link: 'https://sistema-citas.com/',                 title: t('portfolio.projects.2.title'),  description: t('portfolio.projects.2.description'),  fullDescription: t('portfolio.projects.2.fullDescription'),  technologies: getTechnologies(2) },
    { id: 4,  image: CODERESOLUTIONS, link: 'https://coderesolutions.com/',               title: t('portfolio.projects.3.title'),  description: t('portfolio.projects.3.description'),  fullDescription: t('portfolio.projects.3.fullDescription'),  technologies: getTechnologies(3) },
    { id: 5,  image: IMG2,            link: 'https://www.rover.com/',                     title: t('portfolio.projects.4.title'),  description: t('portfolio.projects.4.description'),  fullDescription: t('portfolio.projects.4.fullDescription'),  technologies: getTechnologies(4) },
    { id: 6,  image: IMG3,            link: 'https://smiledu.com/',                       title: t('portfolio.projects.5.title'),  description: t('portfolio.projects.5.description'),  fullDescription: t('portfolio.projects.5.fullDescription'),  technologies: getTechnologies(5) },
    { id: 7,  image: IMG4,            link: 'https://rosar.netlify.app/',                 title: t('portfolio.projects.6.title'),  description: t('portfolio.projects.6.description'),  fullDescription: t('portfolio.projects.6.fullDescription'),  technologies: getTechnologies(6) },
    { id: 8,  image: IMG5,            link: 'https://www.clinicaluzdeesperanza.pe/',      title: t('portfolio.projects.7.title'),  description: t('portfolio.projects.7.description'),  fullDescription: t('portfolio.projects.7.fullDescription'),  technologies: getTechnologies(7) },
    { id: 9,  image: IMG6,            link: 'https://www.munitumbes.gob.pe/web-mpt/',    title: t('portfolio.projects.8.title'),  description: t('portfolio.projects.8.description'),  fullDescription: t('portfolio.projects.8.fullDescription'),  technologies: getTechnologies(8) },
    { id: 10, image: IMG7,            link: 'https://servizisolarisrls.com/',             title: t('portfolio.projects.9.title'),  description: t('portfolio.projects.9.description'),  fullDescription: t('portfolio.projects.9.fullDescription'),  technologies: getTechnologies(9) },
    { id: 11, image: IMG9,            link: 'https://servizisolarisrls.com/',             title: t('portfolio.projects.10.title'), description: t('portfolio.projects.10.description'), fullDescription: t('portfolio.projects.10.fullDescription'), technologies: getTechnologies(10) },
    { id: 12, image: IMG10,           link: 'https://repositorio.untumbes.edu.pe/',       title: t('portfolio.projects.11.title'), description: t('portfolio.projects.11.description'), fullDescription: t('portfolio.projects.11.fullDescription'), technologies: getTechnologies(11) },
    { id: 13, image: IMG11,           link: 'https://untumbes.edu.pe/',                   title: t('portfolio.projects.12.title'), description: t('portfolio.projects.12.description'), fullDescription: t('portfolio.projects.12.fullDescription'), technologies: getTechnologies(12) },
    { id: 14, image: IMG16,           link: 'https://tramite-documentario.pages.dev/',   title: t('portfolio.projects.13.title'), description: t('portfolio.projects.13.description'), fullDescription: t('portfolio.projects.13.fullDescription'), technologies: getTechnologies(13) },
    { id: 15, image: IMG12,           link: 'https://cybertesis.unmsm.edu.pe/',           title: t('portfolio.projects.14.title'), description: t('portfolio.projects.14.description'), fullDescription: t('portfolio.projects.14.fullDescription'), technologies: getTechnologies(14) },
    { id: 16, image: IMG13,           link: 'https://play.google.com/store/search?q=app%20usil&c=apps&hl=es_PE', title: t('portfolio.projects.15.title'), description: t('portfolio.projects.15.description'), fullDescription: t('portfolio.projects.15.fullDescription'), technologies: getTechnologies(15) },
    { id: 17, image: SERIOUSGAME,     link: 'https://serious-game.42web.io/main/views/index.php', title: t('portfolio.projects.16.title'), description: t('portfolio.projects.16.description'), fullDescription: t('portfolio.projects.16.fullDescription'), technologies: getTechnologies(16), webLink: t('portfolio.projects.16.webLink'), playStoreLink: t('portfolio.projects.16.playStoreLink') },
    { id: 18, image: IMG15,           link: 'https://jafcn09.github.io/peru-spatial-utils/', title: t('portfolio.projects.17.title'), description: t('portfolio.projects.17.description'), fullDescription: t('portfolio.projects.17.fullDescription'), technologies: getTechnologies(17) }
  ], [t, getTechnologies])

  const filteredProjects = useMemo(() => (
    selectedTech === 'All' ? projects : projects.filter(p => p.technologies.some(tech => tech === selectedTech))
  ), [projects, selectedTech])

  useEffect(() => {
    setIsFilterTransitioning(true)
    setCurrentIndex(0)
    const timer = setTimeout(() => setIsFilterTransitioning(false), 500)
    return () => clearTimeout(timer)
  }, [selectedTech])

  const handleNext = useCallback(() => setCurrentIndex(p => (p + 1) % filteredProjects.length), [filteredProjects.length])
  const handlePrev = useCallback(() => setCurrentIndex(p => (p - 1 + filteredProjects.length) % filteredProjects.length), [filteredProjects.length])

  const pauseAutoplay = useCallback(() => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  const handleTouchStart = useCallback((e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }, [])
  const handleTouchMove  = useCallback((e) => setTouchEnd(e.targetTouches[0].clientX), [])
  const handleTouchEnd   = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const dist = touchStart - touchEnd
    if (Math.abs(dist) > 50) { dist > 0 ? handleNext() : handlePrev(); pauseAutoplay() }
  }, [touchStart, touchEnd, handleNext, handlePrev, pauseAutoplay])

  const handleTechSelect = useCallback((tech) => {
    setPreviousTech(selectedTech)
    setSelectedTech(tech)
    setTimeout(() => setPreviousTech(null), 600)
  }, [selectedTech])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(handleNext, 4500)
    return () => clearInterval(interval)
  }, [isAutoPlaying, handleNext])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section id='portfolio' className='portfolio'>
      <h2>{t('portfolio.title')}</h2>

      <div className='portfolio__filter'>
        <div className='portfolio__filter-container'>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              className={`portfolio__filter-btn${selectedTech === tech ? ' active' : ''}${previousTech === tech ? ' fading-out' : ''}`}
              onClick={() => { handleTechSelect(tech); pauseAutoplay() }}
            >
              {tech === 'All' ? t('portfolio.filter_all') : tech}
            </button>
          ))}
        </div>
      </div>

      <div className='container portfolio__wrapper'>
        <button className='portfolio__btn' onClick={() => { handlePrev(); pauseAutoplay() }} title='Anterior'>
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
                <div className='portfolio__card portfolio__card--skeleton'>
                  <SkeletonLoader variant="image" height="440px" />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`portfolio__slides${isFilterTransitioning ? ' filtering' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`portfolio__slide${isFilterTransitioning ? ' slide-entering' : ''}`}
                  style={{ animationDelay: isFilterTransitioning ? `${index * 80}ms` : '0ms' }}
                >
                  <div className='portfolio__card' onClick={() => setSelectedProject(project)}>
                    <img src={project.image} alt={project.title} className='portfolio__bg-img' />
                    <div className='portfolio__overlay'></div>
                    <div className='portfolio__badge'>
                      <FaCode />
                      <span>Proyecto</span>
                    </div>
                    <span className='portfolio__counter'>
                      {pad(currentIndex + 1)}&thinsp;/&thinsp;{pad(filteredProjects.length)}
                    </span>
                    <div className='portfolio__content'>
                      <h3 className='portfolio__title'>{project.title}</h3>
                      <p className='portfolio__subtitle'>{project.description}</p>
                      <div className='portfolio__tech-tags'>
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className='portfolio__tech-tag'>{tech}</span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className='portfolio__tech-tag portfolio__tech-more'>
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      <div className='portfolio__actions'>
                        <button className='portfolio__view-btn'>
                          <FaCode />
                          <span>Ver Detalles</span>
                        </button>
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noreferrer'
                          className='portfolio__ext-link'
                          onClick={(e) => e.stopPropagation()}
                          title='Ver sitio'
                        >
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className='portfolio__btn' onClick={() => { handleNext(); pauseAutoplay() }} title='Siguiente'>
          <MdChevronRight />
        </button>
      </div>

      <div className='portfolio__indicators'>
        {filteredProjects.map((_, index) => (
          <button
            key={index}
            className={`portfolio__indicator${currentIndex === index ? ' active' : ''}`}
            onClick={() => { setCurrentIndex(index); pauseAutoplay() }}
          />
        ))}
      </div>

      <div className='portfolio__progress'>
        <div
          className='portfolio__progress-bar'
          style={{ width: `${((currentIndex + 1) / filteredProjects.length) * 100}%` }}
        />
      </div>

      <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
})

Portfolio.displayName = 'Portfolio'
export default Portfolio
