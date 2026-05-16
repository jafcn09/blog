import React from 'react'
import './about.css'
import { FaAward, FaBriefcase, FaProjectDiagram } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useSkeletonLoader } from '../../hooks/useSkeletonLoader'
import SkeletonLoader from '../common/SkeletonLoader'

const About = () => {
  const { t } = useTranslation()
  const { ref, isLoading } = useSkeletonLoader(600)

  const stats = [
    {
      icon: <FaBriefcase />,
      title: t('about.expertise'),
      value: t('about.expertise_desc')
    },
    {
      icon: <FaProjectDiagram />,
      title: t('about.projects'),
      value: t('about.projects_desc')
    },
    {
      icon: <FaAward />,
      title: t('about.certifications'),
      value: t('about.certifications_desc')
    }
  ]

  return (
    <section id='about' className='about' ref={ref}>
      <h2>{t('about.title')}</h2>

      <div className='container about__container'>
        {isLoading ? (
          <>
            <div className='about__stats'>
              {[1, 2, 3].map((index) => (
                <div key={index} className='about__stat'>
                  <SkeletonLoader variant="avatar" width="50px" height="50px" />
                  <div className='about__stat-info'>
                    <SkeletonLoader variant="text" width="120px" />
                    <SkeletonLoader variant="text" width="80px" />
                  </div>
                </div>
              ))}
            </div>
            <div className='about__bio'>
              <SkeletonLoader variant="paragraph" count={1} />
            </div>
          </>
        ) : (
          <>
            <div className='about__stats'>
              {stats.map((stat, index) => (
                <div key={index} className='about__stat'>
                  <div className='about__stat-icon'>{stat.icon}</div>
                  <div className='about__stat-info'>
                    <span className='about__stat-value'>{stat.value}</span>
                    <span className='about__stat-title'>{stat.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className='about__bio'>
              <p>{t('about.bio')}</p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default About
