import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './login-logout-button.css';

export const LoginButton = () => {

    const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} id='login-button'>Iniciar Sesión</button>
  )
}
