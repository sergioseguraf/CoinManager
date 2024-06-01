import React, { useEffect } from 'react';
import './landingPage-styles.css';
import { LoginButton } from '../Login-Logout/LoginButton';
import logo from '../../img/logo.png';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import loader from '../../img/loader.gif';
import { Footer } from '../Footer/Footer';
import { FaBitcoin } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { SiDogecoin } from "react-icons/si";
import { SiPolkadot } from "react-icons/si";
import { SiCardano } from "react-icons/si";
import { SiIota } from "react-icons/si";
import { SiLitecoin } from "react-icons/si";
import { SiRipple } from "react-icons/si";


export const LandingPage = () => {

  const { isAuthenticated, isLoading } = useAuth0();
  
  //Efecto aparecer al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.hidden');

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.75) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  //Loader para cuando está cargando la autenticación
  if (isLoading) {
    return <div className="activosPage-loader"><img src={loader} alt='Loading...'/></div>
  }


  return (
    <>
      {/* Si está autenticado redirigimos a la pagina de portfolio */}
      {isAuthenticated ? <Navigate to="/portafolio" /> : 
        <div className="my-container">
          <header>
            <section className="logo">
                <a href="/portafolio"><img src={logo} alt="CoinManager"/></a>
            </section>
            <div className="options">
                <LoginButton />   
            </div>     
          </header>
          
          <section>
            <div className="title-section">
              <div className="title-section-text-div">
                <h1>Bienvenido a 
                  <span> CoinManager</span>
                </h1>
                <p><span>Inicia sesión</span> para comenzar a gestionar tus <span>criptomonedas</span>
                  <br/>de la manera más sencilla
                </p>
                <div>
                  <LoginButton />
                </div>
              </div>
              <div className="title-section-img-div">
                <img src={logo} alt="CoinManager"/>
              </div>
            </div>
          </section>

          <section className="info-section">
            <div className="info-section-text-div">
              <h2>Gestiona tu portafolio de<span> Criptomonedas</span></h2>
              <p>Descubre todas nuestras <span>características</span> y lleva una buena gestión de tu <span>portafolio</span></p>
            </div>
            <div className="info-section-div">
              <div className="info-section-div-card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 dark:text-blue-400">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
                <h3>Rastreador en tiempo real</h3>
                <div>
                  <p>Realiza un seguimiento en tiempo real <br/>de las cotizaciones de tus criptomonedas e inversiones.</p>
                  <p>Obtén información instantánea <br/>para tomar decisiones informadas.</p>
                </div>
              </div>
              <div className="info-section-div-card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 dark:text-blue-400">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
                <h3>Gestión de Portafolio</h3>
                <div>
                  <p>Visualiza ganancias y pérdidas<br/>a través de gráficos intuitivos.</p>
                  <p>Añade y organiza activos en tus portfolios<br/> para una gestión eficiente.</p>
                </div>
              </div>
              <div className="info-section-div-card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 dark:text-blue-400">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
                <h3>Estadísticas detalladas</h3>
                <div>
                  <p>Analiza estadísticas detalladas de tus inversiones
                  <br/>Obtén información precisa <br/> sobre rendimientos y tendencias.
                  </p>
                </div>
              </div>
              <div className="info-section-div-card hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 dark:text-blue-400">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
                <h3>Alertas personalizadas</h3>
                <div>
                  <p>Configura alertas para recibir <br/>notificaciones sobre cambios significativos.
                  Mantente informado<br/>y toma decisiones oportunas.
                  </p>
                </div>
              </div>
              <div className="info-section-div-card hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 dark:text-blue-400">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
                <h3>Diversificación inteligente</h3>
                <div>
                  <p>Aprende sobre la importancia<br/>de diversificar tus activos
                  <br/>Descubre estrategias para optimizar tu portafolio.</p>
                </div>
              </div>
              <div className="info-section-div-card hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 dark:text-blue-400">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
                <h3>Noticias de última hora</h3>
                <div>
                  <p>Nantente actualizado<br/>con las últimas noticias<br/> del mundo financiero
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="title-section">
              <div className="title-section-img-div hidden">
                <FaBitcoin id='bitcoin'/>
              </div>
              <div className="title-section-text-div">
                <h2 className='hidden'>Añade tantos <span> portafolios</span> como quieras </h2>
                <p className='hidden'>En <span>CoinManager</span>, puedes personalizar y administrar varios portafolios de inversión.<br/>
                ¡Añade, organiza y supervisa tus activos financieros de forma fácil y rápida!<br/>
                Explora el mundo de las inversiones de manera intuitiva con CoinManager.
                </p>
              </div>
            </div>
          </section>

          <section className="slider">
            <h2 className="crypto-title hidden"><span>Disponemos</span> de todas las criptomonedas</h2>
            <p className='hidden'>Echa un vistazo a todas las <span>criptomonedas</span> en nuestra web y comienza a gestionar tu <span>portafolio</span></p>
            <div className="slide-track hidden">
              <div className="slide">
                <FaBitcoin className="crypto-icon"/>
              </div>
              <div className="slide">
                <TbCurrencySolana className="crypto-icon" />
              </div>
              <div className="slide">
                <FaEthereum className="crypto-icon"/>
              </div>
              <div className="slide">
                <SiDogecoin className="crypto-icon" />
              </div>
              <div className="slide">
                <SiPolkadot className="crypto-icon" />
              </div>
              <div className="slide">
                <SiIota className="crypto-icon" />
              </div>
              <div className="slide">
                <SiLitecoin className="crypto-icon" />
              </div>
              <div className="slide">
                <SiCardano className="crypto-icon" />
              </div>
              <div className="slide">
                <SiRipple className="crypto-icon" />
              </div>
              <div className="slide">
                <FaBitcoin className="crypto-icon"/>
              </div>
              <div className="slide">
                <TbCurrencySolana className="crypto-icon" />
              </div>
              <div className="slide">
                <FaEthereum className="crypto-icon"/>
              </div>
              <div className="slide">
                <SiDogecoin className="crypto-icon" />
              </div>
              <div className="slide">
                <SiPolkadot className="crypto-icon" />
              </div>
              <div className="slide">
                <SiIota className="crypto-icon" />
              </div>
              <div className="slide">
                <SiLitecoin className="crypto-icon" />
              </div>
              <div className="slide">
                <SiCardano className="crypto-icon" />
              </div>
              <div className="slide">
                <SiRipple className="crypto-icon" />
              </div>
            </div>
          </section>

          <footer>  
            <Footer/>         
          </footer>
        </div>
      }
    </> 
  )
}
