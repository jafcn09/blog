import React from 'react'
import './experience.css'
import { useTranslation } from 'react-i18next'
import { useSkeletonLoader } from '../../hooks/useSkeletonLoader'
import SkeletonLoader from '../common/SkeletonLoader'
import { FaDesktop, FaServer, FaDatabase, FaTools } from 'react-icons/fa'

const CATEGORY_ICONS = {
  frontend:  <FaDesktop />,
  backend:   <FaServer />,
  databases: <FaDatabase />,
  tools:     <FaTools />
}

const Experience = () => {
  const { t } = useTranslation()
  const { ref, isLoading } = useSkeletonLoader(700)

  const skillsData = [
    {
      category: 'frontend',
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Flutter', 'Tailwind', 'UI/UX']
    },
    {
      category: 'backend',
      skills: ['Node.js', 'NestJs', 'Spring Boot', 'Express', 'Golang', 'Python', 'PHP']
    },
    {
      category: 'databases',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'SQL Server', 'SQLite']
    },
    {
      category: 'tools',
      skills: ['Git', 'Docker', 'AWS', 'GCP', 'Postman', 'Jira', 'Figma', 'Power BI', 'Looker Studio', 'Pencil']
    }
  ]

  return (
    <section id='experience' className='experience' ref={ref}>
      <h2>{t('experience.title')}</h2>

      <div className='container experience__container'>
        {isLoading ? (
          [1, 2, 3, 4].map((index) => (
            <div key={index} className='experience__category'>
              <SkeletonLoader variant="title" width="60%" />
              <div className='experience__tags' style={{ marginTop: '1rem' }}>
                {[80, 100, 90, 70].map((w, i) => (
                  <SkeletonLoader key={i} variant="button" width={`${w}px`} />
                ))}
              </div>
            </div>
          ))
        ) : (
          skillsData.map((skillGroup) => (
            <div key={skillGroup.category} className='experience__category'>
              <h3 className='experience__category-title'>
                <span className='experience__category-icon'>
                  {CATEGORY_ICONS[skillGroup.category]}
                </span>
                {t(`experience.${skillGroup.category}`)}
              </h3>
              <div className='experience__tags'>
                {skillGroup.skills.map((skill) => (
                  <span key={skill} className='experience__tag'>{skill}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Experience
