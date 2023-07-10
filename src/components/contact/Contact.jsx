import React from 'react'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import {BsWhatsapp} from 'react-icons/bs'
import {useRef} from 'react';
import emailjs from 'emailjs-com'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_sm81xv4', 'template_dwcwncb', form.current, 'ER0xYYiOmOi6ykGwA')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <section id='contact'>
      <h2>Medios De Contacto</h2>
      
      <div className='container contact__container'>
        <div className='contact__options'>
          <article className='contact__option'>
            <MdOutlineEmail className='contact__option-icon'/>
            <h4>Linkedin</h4>
            <a href="https://www.linkedin.com/in/jafetcanepa/" target="_blank">Enviar un mensaje</a>
          </article>

          <article className='contact__option'>
            <RiMessengerLine className='contact__option-icon'/>
            <h4>Messenger</h4>
            <a href="https://m.me/Jafet Ca" target="_blank">Enviar un mensaje</a>
          </article>

          <article className='contact__option'>
            <BsWhatsapp className='contact__option-icon'/>
            <h4>WhatsApp</h4>
            <a href="https://wa.me/+51992290742">Enviar un mensaje</a>
          </article>
        </div>

        <form ref={form} className="email-container" onSubmit={sendEmail} >
        <input type="text" name="name" placeholder='¿Cuáles son tus nombres?' required/>
     
          <input type="email" name="u_email" placeholder="Ingrese su correo" required/>

          <textarea name="message" rows="7" placeholder='Escribe tu mensaje.' required minLength='20' maxLength='500'></textarea>


          <button type='submit' className='btn btn-primary'>Enviar Mensaje</button>
        </form>
      </div>
    </section>
  )
}

export default Contact