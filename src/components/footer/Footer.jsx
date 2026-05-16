import React from 'react'
import './footer.css'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()

  const copyrightText = i18n.language === 'es'
    ? `© ${currentYear} Jhafet Cánepa. Todos los derechos reservados.`
    : `© ${currentYear} Jhafet Cánepa. All rights reserved.`

  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <div className='footer__copyright'>
          <small>{copyrightText}</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer