import React from 'react'
import { MdClose } from 'react-icons/md'
import { FaCalendarAlt, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa'
import './conferenceModal.css'

const ConferenceModal = ({ conference, onClose }) => {
  if (!conference) return null

  return (
    <div className='conference-modal__overlay' onClick={onClose}>
      <div className='conference-modal__content' onClick={(e) => e.stopPropagation()}>
        <button className='conference-modal__close' onClick={onClose} title='Cerrar'>
          <MdClose />
        </button>

        <div className='conference-modal__image'>
          <img src={conference.image} alt={conference.title} />
          <div className='conference-modal__year-badge'>
            <FaCalendarAlt />
            <span>{conference.year}</span>
          </div>
        </div>

        <div className='conference-modal__body'>
          <h2 className='conference-modal__title'>{conference.title}</h2>
          <p className='conference-modal__subtitle'>{conference.subtitle}</p>

          <div className='conference-modal__details'>
            <div className='conference-modal__detail'>
              <FaUserTie />
              <div>
                <span className='conference-modal__label'>Rol</span>
                <span className='conference-modal__value'>{conference.role}</span>
              </div>
            </div>
            <div className='conference-modal__detail'>
              <FaMapMarkerAlt />
              <div>
                <span className='conference-modal__label'>Organizador</span>
                <span className='conference-modal__value'>{conference.organizer}</span>
              </div>
            </div>
          </div>

          <button className='btn conference-modal__btn' onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConferenceModal
