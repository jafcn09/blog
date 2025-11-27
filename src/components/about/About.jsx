import React from 'react'
import './about.css'
import { FaAward, FaBriefcase, FaProjectDiagram } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

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
    <section id='about' className='about'>
      <h2>{t('about.title')}</h2>

      <div className='container about__container'>
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
      </div>
    </section>
  )
}

export default About
