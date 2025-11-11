import React from 'react'
import CV from '../../assets/CURRICULUMVITAE-JHAFETCANEPAMACEDA.pdf'
import { useTranslation } from 'react-i18next'

const CTA = () => {
  const { t } = useTranslation()

  return (
    <div className='cta'>
        <a href={CV} download="CURRICULUMVITAE-JHAFETCANEPAMACEDA.pdf" className='btn btn-secondary'>
          {t('header.cta_download')}
        </a>
        <a href="#contact" className='btn btn-primary'>
          {t('header.cta_contact')}
        </a>
    </div>
  )
}

export default CTA