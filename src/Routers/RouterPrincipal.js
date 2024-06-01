import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { Login } from '../Componets/Auth/Login';
import { PortfolioPage } from '../Componets/Portafolio/PortfolioPage';
import { ActivosPage } from '../Componets/Activos/ActivosPage';
import { Error } from '../Componets/NotFoundPage/Error';
import { LandingPage } from '../Componets/LandingPage/LandingPage';
import { Contact } from '../Componets/Header/Contact';
import { Terms } from '../Componets/Header/Terms';

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
    
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login/>} exact />
            <Route path='/portafolio' element={<PortfolioPage/>} />
            <Route path='/activos' element={<ActivosPage/>} />
            <Route path='/contacto' element={<Contact/>} />
            <Route path='/terminos' element={<Terms/>} />
            <Route path='*' element={<Error/>} />         
        </Routes>

    </BrowserRouter>
  )
}
