import React from 'react'
import './experience.css'
import { useTranslation } from 'react-i18next'

const Experience = () => {
  const { t } = useTranslation()

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
      skills: ['Git', 'Docker', 'AWS', 'GCP', 'Postman', 'Jira', 'Figma', 'Power BI']
    }
  ]

  return (
    <section id='experience' className='experience'>
      <h2>{t('experience.title')}</h2>

      <div className='container experience__container'>
        {skillsData.map((skillGroup) => (
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
        ))}
      </div>
    </section>
  )
}

export default Experience
