import React, { useRef, useState } from 'react'
import './contact.css'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const Contact = () => {
  const { t } = useTranslation()
  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    const name = form.current.name.value.trim()
    const email = form.current.u_email.value.trim()
    const subject = form.current.subject.value.trim()
    const message = form.current.message.value.trim()

    if (!name) newErrors.name = 'El nombre es requerido'
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
      toast.error('Por favor completa todos los campos correctamente', {
        position: 'bottom-right',
        autoClose: 3000
      })
      return
    }

    setIsSubmitting(true)

    emailjs.sendForm('service_sm81xv4', 'template_dwcwncb', form.current, 'ER0xYYiOmOi6ykGwA')
      .then((result) => {
        toast.success('¡Mensaje enviado correctamente!', {
          position: 'bottom-right',
          autoClose: 3000
        })
        form.current.reset()
        setErrors({})
        setIsSubmitting(false)
      }, (error) => {
        toast.error('Error al enviar el mensaje. Intenta de nuevo.', {
          position: 'bottom-right',
          autoClose: 3000
        })
        setIsSubmitting(false)
      })
  }

  return (
    <section id='contact' className='contact'>
      <h2>{t('contact.title')}</h2>
      <p className='contact__description'>{t('contact.description')}</p>

      <div className='container contact__container'>
        <form ref={form} className='contact__form' onSubmit={sendEmail}>
          <input
            type='text'
            name='name'
            placeholder={t('contact.form.name')}
            required
            disabled={isSubmitting}
          />
          <input
            type='email'
            name='u_email'
            placeholder={t('contact.form.email')}
            required
            disabled={isSubmitting}
          />
          <input
            type='text'
            name='subject'
            placeholder={t('contact.form.subject')}
            required
            disabled={isSubmitting}
          />
          <textarea
            name='message'
            rows='7'
            placeholder={t('contact.form.message')}
            required
            minLength='20'
            maxLength='500'
            disabled={isSubmitting}
          ></textarea>
          <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : t('contact.form.submit')}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact