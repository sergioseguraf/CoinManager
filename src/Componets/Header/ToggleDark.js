import React, { useState, useEffect } from 'react';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

export const ToggleDark = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('selectedTheme') === 'dark'
  );

  useEffect(() => {
    const selectedTheme = isDarkMode ? 'dark' : 'light';
    document.querySelector('body').setAttribute('data-theme', selectedTheme);
    //document.querySelector('.add-portfolio-container').setAttribute('data-theme', selectedTheme);
    localStorage.setItem('selectedTheme', selectedTheme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="toggle-container">      
      <button onClick={toggleTheme} >
        {isDarkMode ? <><MdDarkMode id='darkmode-icon'/> Modo oscuro </> : <> <MdLightMode id='lightmode-icon'/> Modo claro </>  }
      </button>
    </div>
  );
};

/*
export const ToggleDark = () => {

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
        localStorage.setItem("selectedTheme", "dark")
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
        localStorage.setItem("selectedTheme", "light")
    }

    const selectedTheme = localStorage.getItem("selectedTheme");

    if (selectedTheme === "dark") {
        setDarkMode();
    }

    const toggleTheme = e => {
        if (e.target.checked) setDarkMode();
        else setLightMode()
    }

  return (
    <div className="toggle-container">
        <input onChange={toggleTheme} defaultChecked={selectedTheme === "dark"} id="checkbox" name="checkbox" type="checkbox"/>
        <label className="toogle-label" htmlFor="checkbox"></label>
    </div>
  )
}*/