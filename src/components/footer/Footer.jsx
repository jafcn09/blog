import React from 'react'
import './footer.css'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <div className='footer__copyright'>
          <small>{t('footer.copyright')}</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer