import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<StrictMode>
        <Auth0Provider 
            domain='dev-ao08v01g6z47djwy.us.auth0.com' 
            clientId='uokmZC8b6MAgHg8Va9MEaiM9DhkTh7Kb'
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    //</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
