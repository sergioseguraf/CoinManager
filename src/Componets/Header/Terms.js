import React, { useEffect } from 'react';
import { Footer } from '../Footer/Footer.js';
import { Header } from './Header.js';
import './terms.css';


export const Terms = () => {

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
      <div className="terms-container">
        <h2 className="fade-in">Política de Privacidad</h2>
          <p className="fade-in">
            En CoinManager, nos comprometemos a proteger tu privacidad y la seguridad de tus datos. La información personal
            que nos proporciones se utilizará para mejorar tu experiencia en la plataforma y garantizar la seguridad de tu cuenta.
          </p>

          <p className="fade-in">
            Recopilamos información como tu nombre, dirección de correo electrónico y datos de transacciones, y utilizamos
            medidas de seguridad avanzadas para proteger esta información. No compartiremos tus datos con terceros sin tu consentimiento.
          </p>

          <h2 className="fade-in">Política de Cookies</h2>
          <p className="fade-in">
            CoinManager utiliza cookies para ofrecerte una experiencia personalizada. Estas cookies nos permiten recordar tus
            preferencias y analizar el rendimiento del sitio. Al utilizar CoinManager, aceptas el uso de cookies de acuerdo con
            nuestra política.
          </p>

          <p className="fade-in">
            Las cookies también se utilizan para rastrear el rendimiento del sitio, mejorar nuestras ofertas y garantizar la
            seguridad de tu cuenta.
          </p>

          <h2 className="fade-in">Condiciones de Uso</h2>
          <p className="fade-in">
            Al utilizar CoinManager, aceptas cumplir con estas condiciones de uso. CoinManager proporciona una plataforma para
            gestionar tus activos y no se hace responsable de las decisiones de inversión que tomes.
          </p>

          <p className="fade-in">
            El uso del sitio está sujeto a restricciones y condiciones. No se permite el acceso no autorizado ni la violación de
            la seguridad del sitio.
          </p>

          <h2 className="fade-in">Propiedad Intelectual</h2>
          <p className="fade-in">
            Todo el contenido en CoinManager, incluidos textos, gráficos, logotipos, imágenes y software, está protegido por
            derechos de autor y otras leyes de propiedad intelectual.
          </p>

          <p className="fade-in">
            No se permite el uso no autorizado del contenido de CoinManager. Los usuarios solo pueden utilizar la plataforma para
            fines personales y no comerciales.
          </p>

          <h2 className="fade-in">Renuncia de Responsabilidad</h2>
          <p className="fade-in">
            La información proporcionada en CoinManager es solo para fines informativos. No garantizamos la exactitud ni la
            integridad de la información presentada y no nos hacemos responsables de las decisiones de inversión basadas en ella.
          </p>

          <p className="fade-in">
            Los usuarios deben realizar su propia investigación antes de tomar decisiones financieras. CoinManager no asume
            ninguna responsabilidad por pérdidas o daños relacionados con el uso del sitio.
          </p>
        </div>

      <footer>  
        <Footer/>         
      </footer>
    </>
  )
}
