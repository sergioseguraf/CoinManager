import React, { useState } from 'react';
import logo from '../../img/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { FaRegUserCircle, FaChevronDown  } from "react-icons/fa";
import { ToggleDark } from './ToggleDark';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../Login-Logout/LogoutButton';
import { motion, AnimatePresence } from 'framer-motion';
import { MdContactPhone } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import './header-styles.css';

export const Header = ({search, searchCrypto}) => {

  //Hook para saber si esta autenticado un usuario y mostrar el boton de logout
  const { isAuthenticated } = useAuth0();
  //Obtener datos del usuario logeado
  const { user } = useAuth0();
  //Estado para manejar si el contenedor mostrar opciones esta visible o no
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  //Manejador para cuando se pulsa el icono de opciones. 
  const showContainer = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  // Obtenemos la ruta actual y comprobamos si esta en la página de activos para mostrar el SearchBar
  const location = useLocation();
  const isAssetsPage = location.pathname === '/activos';


  return (
    <>
      {isAuthenticated && (
      <>
          <section className="logo">
              <a href="/portafolio"><img src={logo} alt="CoinManager"/></a>
          </section>
          <section className={`nav-links ${isAssetsPage ? 'with-searchbar' : ''}`}>
              <NavLink to="/portafolio" className={({isActive}) => isActive ? "active" : ""}>Portafolio</NavLink>
              <NavLink to="/activos" className={({isActive}) => isActive ? "active" : ""}>Activos</NavLink>
          </section>
          
          <div className="options">        
              {/* Condicional para que aparezca el SearchBar solo en la página de activos */}
              {isAssetsPage && <SearchBar search={search} searchCrypto={searchCrypto} />}            
              <div className='options-user-icon-name' onClick={showContainer}>
                <div>
                  <FaRegUserCircle id='options-user-icon' />
                  {/* Prueba a meter user.pictura para la imagen del usuario */}
                  <span id="user-name">{user.name}</span> 
                  {/* Condicional para comprobar si el menu de opciones esta abierto y mostrar un icono u otro con una transicion */}
                  <FaChevronDown  id='option-user-icon-down' className={`option-user-icon-down ${isOptionsVisible ? 'up' : ''}`}/>              
                </div>
              </div>        
          </div>
          
          {/* Condicional para mostrar el menu de opciones cuando se pulsa en el nombre de usuario*/}
          <AnimatePresence>
            {isOptionsVisible && (
              <motion.div className='options-menu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ToggleDark />
                <NavLink to='/contacto' id='contact-button'>
                    <MdContactPhone id='contact-button-icon'/>
                    Contacto
                </NavLink>
                <NavLink to='/terminos' id='terms-button'>
                    <IoIosPaper id='terms-button-icon'/>
                    Términos
                </NavLink>
                <LogoutButton />
              </motion.div>
            )}
          </AnimatePresence>
      </>
    )}
    </>
  )
}
