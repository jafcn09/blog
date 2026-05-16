import React from 'react'
import './experience.css'
import { useTranslation } from 'react-i18next'
import { useSkeletonLoader } from '../../hooks/useSkeletonLoader'
import SkeletonLoader from '../common/SkeletonLoader'

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
      skills: ['Git', 'Docker', 'AWS', 'GCP', 'Postman', 'Jira', 'Figma', 'Power BI', 'Looker Studio', 'Driblle', 'Pencil']
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
              <div className='experience__tags' style={{marginTop: '1rem'}}>
                <SkeletonLoader variant="button" width="80px" />
                <SkeletonLoader variant="button" width="100px" />
                <SkeletonLoader variant="button" width="90px" />
                <SkeletonLoader variant="button" width="70px" />
              </div>
            </div>
          ))
        ) : (
          skillsData.map((skillGroup) => (
            <div key={skillGroup.category} className='experience__category'>
              <h3 className='experience__category-title'>
                {t(`experience.${skillGroup.category}`)}
              </h3>
              <div className='experience__tags'>
                {skillGroup.skills.map((skill) => (
                  <span key={skill} className='experience__tag'>
                    {skill}
                  </span>
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
