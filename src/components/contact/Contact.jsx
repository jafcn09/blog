import React, { useRef, useState } from 'react'
import './contact.css'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSkeletonLoader } from '../../hooks/useSkeletonLoader'
import SkeletonLoader from '../common/SkeletonLoader'
import { MdOutlineEmail, MdArrowForward } from 'react-icons/md'
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import { BiCode } from 'react-icons/bi'

const CONTACT_OPTIONS = [
  {
    icon: <MdOutlineEmail />,
    label: 'Email',
    href: 'mailto:jafetcanepamaceda05@gmail.com',
    action: 'Enviar mensaje'
  },
  {
    icon: <BsLinkedin />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jafetcanepa/',
    action: 'Ver perfil'
  },
  {
    icon: <BsGithub />,
    label: 'GitHub',
    href: 'https://github.com/jafcn09',
    action: 'Ver proyectos'
  },
  {
    icon: <BiCode />,
    label: 'CodeResolutions',
    href: 'https://coderesolutions.com/home',
    action: 'Visitar empresa'
  }
]

const Contact = () => {
  const { t } = useTranslation()
  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const { ref, isLoading } = useSkeletonLoader(800)

  const validateForm = () => {
    const newErrors = {}
    const name    = form.current.name.value.trim()
    const email   = form.current.u_email.value.trim()
    const subject = form.current.subject.value.trim()
    const message = form.current.message.value.trim()

    if (!name)    newErrors.name    = 'El nombre es requerido'
    if (!email) {
      newErrors.email = 'El correo es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El correo no es válido'
    }
    if (!subject) newErrors.subject = 'El asunto es requerido'
    if (!message) newErrors.message = 'El mensaje es requerido'
    if (message.length < 20) newErrors.message = 'El mensaje debe tener al menos 20 caracteres'

    return newErrors
  }

  const sendEmail = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      toast.error('Por favor completa todos los campos correctamente', { position: 'bottom-right', autoClose: 3000 })
      return
    }

    setIsSubmitting(true)
    emailjs.sendForm('service_sm81xv4', 'template_dwcwncb', form.current, 'ER0xYYiOmOi6ykGwA')
      .then(() => {
        toast.success('¡Mensaje enviado correctamente!', { position: 'bottom-right', autoClose: 3000 })
        form.current.reset()
        setErrors({})
        setIsSubmitting(false)
      }, () => {
        toast.error('Error al enviar el mensaje. Intenta de nuevo.', { position: 'bottom-right', autoClose: 3000 })
        setIsSubmitting(false)
      })
  }

  return (
    <section id='contact' className='contact' ref={ref}>
      <h2>{t('contact.title')}</h2>
      <p className='contact__description'>{t('contact.description')}</p>

      <div className='container contact__container'>
        {isLoading ? (
          <div className='contact__form'>
            <SkeletonLoader variant="text" height="50px" />
            <SkeletonLoader variant="text" height="50px" />
            <SkeletonLoader variant="text" height="50px" />
            <SkeletonLoader variant="paragraph" height="150px" />
            <SkeletonLoader variant="button" width="150px" height="45px" />
          </div>
        ) : (
          <>
            <div className='contact__options'>
              {CONTACT_OPTIONS.map((option) => (
                <article key={option.label} className='contact__option'>
                  <div className='contact__option-icon'>{option.icon}</div>
                  <div className='contact__option-info'>
                    <h4 className='contact__option-label'>{option.label}</h4>
                    <a
                      href={option.href}
                      target='_blank'
                      rel='noreferrer'
                      className='contact__option-link'
                    >
                      {option.action} <MdArrowForward />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <form ref={form} className='contact__form' onSubmit={sendEmail}>
              <input
                type='text'
                name='name'
                placeholder={t('contact.form.name')}
                required
                disabled={isSubmitting}
              />
              {errors.name && <p className='contact__form-error'>{errors.name}</p>}

              <input
                type='email'
                name='u_email'
                placeholder={t('contact.form.email')}
                required
                disabled={isSubmitting}
              />
              {errors.email && <p className='contact__form-error'>{errors.email}</p>}

              <input
                type='text'
                name='subject'
                placeholder={t('contact.form.subject')}
                required
                disabled={isSubmitting}
              />
              {errors.subject && <p className='contact__form-error'>{errors.subject}</p>}

              <textarea
                name='message'
                rows='6'
                placeholder={t('contact.form.message')}
                required
                minLength='20'
                maxLength='500'
                disabled={isSubmitting}
              ></textarea>
              {errors.message && <p className='contact__form-error'>{errors.message}</p>}

              <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : t('contact.form.submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}

export default Contact
