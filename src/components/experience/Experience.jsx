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
      skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'SASS', 'Tailwind', 'Angular', 'React', 'UI/UX']
    },
    {
      category: 'backend',
      icon: '⚙️',
      skills: ['Java Web', 'Spring Boot', 'REST API', 'AWS', 'Google Cloud', 'Azure', 'PHP', '.NET Core', 'Node.js']
    },
    {
      category: 'databases',
      icon: '🗄️',
      skills: ['MySQL', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Firebase', 'SQLite']
    },
    {
      category: 'tools',
      icon: '🛠️',
      skills: ['Git/GitHub', 'VS Code', 'IntelliJ IDEA', 'Postman', 'Docker', 'Jira']
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
