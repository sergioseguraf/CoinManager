import React, { useEffect } from 'react';
import { Footer } from '../Footer/Footer.js';
import { Header } from './Header.js';
import './terms.css';

export const Contact = () => {

  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    fadeInElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('fade-in');
      }, index * 500);
    });
  }, []);

  return (
    <>
      <header>
        <Header/>
      </header>

      <div className="contact-container">
        <h2 className="fade-in">Contacto</h2>
        <p className="fade-in">
          Si tienes alguna pregunta, comentario o sugerencia, no dudes en ponerte en contacto con nosotros.
        </p>

        <div className="contact-info fade-in">
          <p className="fade-in">Email: <a className='link' href="mailto:info@coinmanager.com">info@coinmanager.com</a></p>
        </div>

      </div>

      <footer>  
        <Footer/>         
      </footer>
    </>

  )
}
