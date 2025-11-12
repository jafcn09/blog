import React from 'react'
import './about.css'
import ME from '../../assets/work1.jpg'
import { FaAward } from 'react-icons/fa'
import { GiBrain } from 'react-icons/gi'
import { VscFolderLibrary } from 'react-icons/vsc'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  return (
    <section id='about' className='about'>
      <div className='container about__container'>
        <div className='about__content'>
          <h2>{t('about.title')}</h2>

          <div className='about__cards'>
            <article className='about__card'>
              <div className='about__card-icon'>
                <GiBrain />
              </div>
              <h5>{t('about.expertise')}</h5>
              <small>{t('about.expertise_desc')}</small>
            </article>
            <article className='about__card'>
              <div className='about__card-icon'>
                <FaAward />
              </div>
              <h5>{t('about.certifications')}</h5>
              <small>{t('about.certifications_desc')}</small>
            </article>
            <article className='about__card'>
              <div className='about__card-icon'>
                <VscFolderLibrary />
              </div>
              <h5>{t('about.projects')}</h5>
              <small>{t('about.projects_desc')}</small>
            </article>
          </div>

          <div className='about__bio'>
            <p>{t('about.bio')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About