import React from 'react'
import './experience.css'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const Experience = () => {
  const { t } = useTranslation()

  const skillsData = [
    {
      category: 'frontend',
      icon: '🎨',
      skills: ['HTML',  'CSS', 'Tailwind', 'Flutter', 'Angular', 'React', 'Php', 'UI/UX']
    },
    {
      category: 'backend',
      icon: '⚙️',
      skills: ['Spring Boot', 'NestJs', 'Express', 'Golang', 'Llml']
    },
    {
      category: 'databases',
      icon: '🗄️',
      skills: ['MySQL', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Firebase', 'SQLite']
    },
    {
      category: 'tools',
      icon: '🛠️',
      skills: ['Git',  'Postman', 'Docker', 'Jira', 'Figma', 'Power BI', 'GCD', 'AWS' ]
    }
  ]

  return (
    <section id='experience' className='experience'>
      <h2>{t('experience.title')}</h2>

      <div className='container experience__container'>
        {skillsData.map((skillGroup) => (
          <div key={skillGroup.category} className='experience__category'>
            <div className='experience__category-header'>
              <span className='experience__category-icon'>{skillGroup.icon}</span>
              <h3>{t(`experience.${skillGroup.category}`)}</h3>
            </div>

            <div className='experience__skills'>
              {skillGroup.skills.map((skill) => (
                <article key={skill} className='experience__skill'>
                  <BsFillPatchCheckFill className='experience__skill-icon' />
                  <span>{skill}</span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
