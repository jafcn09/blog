import React, { useState, useEffect, useCallback } from 'react'
import './conferences.css'
import { useTranslation } from 'react-i18next'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaExpand } from 'react-icons/fa'
import ConferenceModal from './ConferenceModal'

import CONF1 from '../../assets/conf1.jpg'
import CONF2 from '../../assets/conf2.jpg'
import CONF3 from '../../assets/conf3.jpg'
import CONF4 from '../../assets/conf4.jpg'
import CONF5 from '../../assets/conf5.jpg'
import CONF6 from '../../assets/conf6.jpg'
import CONF7 from '../../assets/conf7.jpg'

const Conferences = () => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [selectedConference, setSelectedConference] = useState(null)

  const conferences = [
    {
      id: 1,
      image: CONF1,
      title: t('conferences.items.0.title'),
      subtitle: t('conferences.items.0.subtitle'),
      role: t('conferences.items.0.role'),
      organizer: t('conferences.items.0.organizer'),
      year: '2024'
    },
    {
      id: 2,
      image: CONF2,
      title: t('conferences.items.1.title'),
      subtitle: t('conferences.items.1.subtitle'),
      role: t('conferences.items.1.role'),
      organizer: t('conferences.items.1.organizer'),
      year: '2024'
    },
    {
      id: 3,
      image: CONF3,
      title: t('conferences.items.2.title'),
      subtitle: t('conferences.items.2.subtitle'),
      role: t('conferences.items.2.role'),
      organizer: t('conferences.items.2.organizer'),
      year: '2024'
    },
    {
      id: 4,
      image: CONF4,
      title: t('conferences.items.3.title'),
      subtitle: t('conferences.items.3.subtitle'),
      role: t('conferences.items.3.role'),
      organizer: t('conferences.items.3.organizer'),
      year: '2024'
    },
    {
      id: 5,
      image: CONF5,
      title: t('conferences.items.4.title'),
      subtitle: t('conferences.items.4.subtitle'),
      role: t('conferences.items.4.role'),
      organizer: t('conferences.items.4.organizer'),
      year: '2023'
    },
    {
      id: 6,
      image: CONF6,
      title: t('conferences.items.5.title'),
      subtitle: t('conferences.items.5.subtitle'),
      role: t('conferences.items.5.role'),
      organizer: t('conferences.items.5.organizer'),
      year: '2023'
    },
    {
      id: 7,
      image: CONF7,
      title: t('conferences.items.6.title'),
      subtitle: t('conferences.items.6.subtitle'),
      role: t('conferences.items.6.role'),
      organizer: t('conferences.items.6.organizer'),
      year: '2023'
    }
  ]

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % conferences.length)
  }, [conferences.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + conferences.length) % conferences.length)
  }, [conferences.length])

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
    <section id='conferences' className='conferences'>
      <h2>{t('conferences.title')}</h2>

      <div className='container conferences__wrapper'>
        <button
          className='conferences__btn conferences__btn--prev'
          onClick={() => { handlePrev(); pauseAutoplay() }}
          title='Previous'
        >
          <MdChevronLeft />
        </button>

        <div
          className='conferences__carousel'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className='conferences__slides'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {conferences.map((conf) => (
              <div key={conf.id} className='conferences__slide'>
                <div
                  className='conferences__card'
                  onClick={() => setSelectedConference(conf)}
                >
                  <div className='conferences__image-container'>
                    <img src={conf.image} alt={conf.title} />
                    <div className='conferences__year-badge'>
                      <FaCalendarAlt />
                      <span>{conf.year}</span>
                    </div>
                  </div>
                  <div className='conferences__content'>
                    <h3 className='conferences__title'>{conf.title}</h3>
                    <p className='conferences__subtitle'>{conf.subtitle}</p>
                    <div className='conferences__details'>
                      <div className='conferences__detail'>
                        <FaUserTie />
                        <span>{conf.role}</span>
                      </div>
                      <div className='conferences__detail'>
                        <FaMapMarkerAlt />
                        <span>{conf.organizer}</span>
                      </div>
                    </div>
                    <button className='conferences__view-btn'>
                      <FaExpand />
                      <span>Ver Detalles</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className='conferences__btn conferences__btn--next'
          onClick={() => { handleNext(); pauseAutoplay() }}
          title='Next'
        >
          <MdChevronRight />
        </button>
      </div>

      <div className='conferences__indicators'>
        {conferences.map((_, index) => (
          <button
            key={index}
            className={`conferences__indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className='conferences__progress'>
        <div
          className='conferences__progress-bar'
          style={{
            width: `${((currentIndex + 1) / conferences.length) * 100}%`
          }}
        />
      </div>

      <ConferenceModal
        conference={selectedConference}
        onClose={() => setSelectedConference(null)}
      />
    </section>
  )
}

export default Conferences
