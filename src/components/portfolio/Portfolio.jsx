import React from 'react'
import './portfolio.css'


import IMG2 from '../../assets/portafolio2.jpeg'
import IMG3 from '../../assets/portafolio3.jpg'
import IMG4 from '../../assets/portafolio4.jpg'
import IMG5 from '../../assets/portafolio5.jpg'
import IMG6 from '../../assets/portafolio6.png'
import IMG7 from '../../assets/portafolio7.jpg'
import IMG8 from '../../assets/portafolio8.jpeg'
import IMG9 from '../../assets/portafolio9.jpeg'
const Portfolio = () => {

  const funcion1 = () =>{
    document.getElementById("contenedor2").style.display="grid";
    document.getElementById("contenedor1").style.marginBottom="2vh";
    document.getElementById("btn1").style.display="none";
    document.getElementById("btn2").style.display="flex";
  }
  const funcion2 = () =>{
    document.getElementById("contenedor3").style.display="grid";
    document.getElementById("contenedor2").style.marginBottom="2vh";
    document.getElementById("btn1").style.display="none";
    document.getElementById("btn2").style.display="none";
    document.getElementById("btn3").style.display="flex";
  }
  const funcion3 = () =>{
    document.getElementById("contenedor2").style.display="none";
    document.getElementById("contenedor3").style.display="none";
    document.getElementById("btn1").style.display="flex";
    document.getElementById("btn2").style.display="none";
    document.getElementById("btn3").style.display="none";
  }

  return (
    <section id='portfolio'>
      <h5>Proyectos Realizados</h5>

      <div className='container portfolio__container' id='contenedor1'>
      

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG2} alt="" />
          </div>
          <h3>Albergue Canina</h3>
          <div className="portfolio__item-cta">
          <a href="https://www.rover.com/" className='btn btn-primary'>Ir</a>
          </div>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG3} alt="" />
          </div>
          <h3>Startup De Educación</h3>
          <div className="portfolio__item-cta">
          <a href="https://smiledu.com/" className='btn btn-primary'>Ir</a>
          </div>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG5} alt="" />
          </div>
          <h3>Gimnasio</h3>
          <div className="portfolio__item-cta">
          <a href="https://rosar.netlify.app/" className='btn btn-primary'>Ir</a>
          </div>
        </article>
        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG4} alt="" />
          </div>
          <h3>Centro De Salud</h3>
          <div className="portfolio__item-cta">
          <a href="https://www.clinicaluzdeesperanza.pe/" className='btn btn-primary'>Ir</a>
          </div>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG6} alt="" />
          </div>
          <h3>Entidad Goburnamental</h3>
          <div className="portfolio__item-cta">
          <a href="https://www.munitumbes.gob.pe/muni20232026/" className='btn btn-primary'>Ir</a>
          </div>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG7} alt="" />
          </div>
          <h3>Supermercado</h3>
          <div className="portfolio__item-cta">
          <a href="https://www.plazavea.com.pe/" className='btn btn-primary'>Ir</a>
          </div>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG8} alt="" />
          </div>
          <h3>Ropa De Modas</h3>
          <div className="portfolio__item-cta">
          <a href="https://pe.hm.com/" className='btn btn-primary'>Ir</a>
          </div>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG9} alt="" />
          </div>
          <h3>Empresa Tecnologica</h3>
          <div className="portfolio__item-cta">
          <a href="https://vtex.com/" className='btn btn-primary'>Ir</a>
          </div>
        </article>
        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG9} alt="" />
          </div>
          <h3>Empresa Tecnologica 2</h3>
          <div className="portfolio__item-cta">
          <a href="https://www.google.com/" className='btn btn-primary'>Ir</a>
          </div>
        </article>
       
      </div>

      <div className='ver__mas' id='btn3'>
        <a href='#portfolio' className='btn btn-primary' onClick={()=>funcion3()}>Ver Menos</a>
      </div>
    </section>
  )
}

export default Portfolio