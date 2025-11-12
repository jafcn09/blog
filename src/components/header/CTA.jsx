import React from 'react'
import { useTranslation } from 'react-i18next'

const CTA = () => {
  const { t } = useTranslation()

  return (
    <div className='cta'>
        <a
          href="https://wa.me/+51992290742"
          target="_blank"
          rel="noopener noreferrer"
          className='btn btn-primary'
        >
          {t('header.cta_whatsapp')}
        </a>
    </div>
  )
}

export default CTA