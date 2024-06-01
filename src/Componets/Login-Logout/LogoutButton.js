import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import './login-logout-button.css';
import { MdLogout } from "react-icons/md";

export const LogoutButton = () => {
    const { logout } = useAuth0();

  return (
    <>
    <hr/>
    <button onClick={() => logout({returnTo: window.location.origin})} id='logout-button'>
      <MdLogout id='logout-icon'/>
      Cerrar Sesión
    </button>
    </>
  )
}
