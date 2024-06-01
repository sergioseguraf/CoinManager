import React, { useState } from 'react';
import './auth-styles.css';
import { Navigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

export const Login = () => {
  //Estado para controlar que panel se está mostrando  
  const [isSignUp, setIsSignUp] = useState(false);
  //Estado para controlar si se ha logeado un usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Manejador para cambiar el panel según si se pulsa registrarse o iniciar sesión
  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  }

  //Manejador para cuando un usuario inicia sesión al pulsar iniciar sesión
  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lo de autenticación
    // Si las credenciales son correctas, el estado será true
    setIsLoggedIn(true);
  }

  //Si el estado de logeado es true redirigimos a la página de portafolio
  if (isLoggedIn) {
    return <Navigate to="/portafolio" />;
  }

  return (
    <body className='login-body'>
      <Spline scene="https://prod.spline.design/dsbFccbX94hnILVI/scene.splinecode" />
      <section>
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
          <div className="form-container sign-up-container">
            <form action="/#">
              <h1>Registrarse</h1>
              <label>
                <input type="text" name="usuario" id="usuario" placeholder="Name" required maxLength="15" />
              </label>
              <label>
                <input type="email" name="email" id="register-email" placeholder="Email" required />
              </label>
              <label>
                <input type="password" name="password" id="register-password" placeholder="Password" required />
              </label>
              <button className='login-button' style={{ marginTop: 9 + 'px' }}>Registrarse</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Iniciar sesión</h1>
              <label>
                <input type="email" name="email" id="sign-in-email" placeholder="Email" required autoFocus />
              </label>
              <label>
                <input type="password" name="password" id="sign-in-password" placeholder="Password" required />
              </label>
              <p className="forgetPassword">
                ¿Has olvidado la contraseña?
                <a id='login-click-here' href="/#"> Click Aquí</a>
              </p>
              <button type="submit" className='login-button'>Iniciar sesión</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Iniciar sesión</h1>
                <p className='login-paragraph'><span id='login-span'>Inicia sesión</span> si ya tienes una cuenta con nosotros</p>
                <button className="mt-5 login-button" id="signIn" onClick={togglePanel}>Iniciar sesión</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Crear una cuenta</h1>
                <p className='login-paragraph'>¡Crea una cuenta con nosotros y <span id='login-span'>gestiona tus criptomonedas</span> de la manera más sencilla!</p>
                <button className='login-button' id="signUp" onClick={togglePanel}>Registrarse</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  )
}