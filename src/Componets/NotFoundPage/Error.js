import React from 'react'
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import './NotFoundPage-styles.css';
import { IoIosArrowRoundForward } from "react-icons/io";

export const Error = () => {
  
  return (
    <main>
      <div className="error-container">
          <div>
            <img className="error-img" src={logo} alt="Logo" />
          </div>
          <h3>Página no encontrada</h3>
          <p>Lo sentimos, la página que buscas no existe.</p>
          <Link to="/portafolio" style={{
              color: 'var(--naranja)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '1rem',
            }}> Volver
            <IoIosArrowRoundForward />
          </Link>        
      </div>
    </main>
  )
}
