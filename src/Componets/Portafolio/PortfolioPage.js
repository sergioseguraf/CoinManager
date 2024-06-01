import '../../index.css';
import { AddPortfolio } from './AddPortfolio.js';
import { Assets } from './Assets';
import { Balance } from './Balance';
import { Footer } from '../Footer/Footer.js';
import { Header } from '../Header/Header.js';
import React, { useState, useEffect } from 'react';
import './portfolioPage-styles.css';
import { useAuth0 } from '@auth0/auth0-react';


export const PortfolioPage = () => {

  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  //Estado donde se guarda el balance total de un portafolio
  const [portfolioBalances, setPortfolioBalances] = useState({});
  //Estado donde se guardan los portafolios en un array (se pasa al addPortfolio)
  const [portfolios, setPortfolios] = useState([]);
  //Estado donde se guardan los activos (y se pasa a assets.js)
  const [assets, setAssets] = useState([]);
  //Estado donde se guardan los id_portfolios
  const [idPortfolio, setIdPortfolios] = useState([]);
  //Estado donde se guarda el porcentaje de un portfolio
  const [porcentaje, setPorcentaje] = useState(null);

  const { isAuthenticated, isLoading, getAccessTokenSilently  } = useAuth0();
  
  //Obtener el token de acceso
  const obtenerTokenAcceso = async () => {
    if (isAuthenticated) {
      try {  
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);
        return accessToken;
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
      }
    }
  };

  
  //Manejador del portafolio seleccionado. Asigna al estado el portafolio selecionado (indice) cuando se pincha en el div
  const handlePortfolioSelect = (portfolio) => {
    setSelectedPortfolio(portfolio);
  }

  //Obtener los id_portfolios para guardarlos en un estado y pasarselos a la función obtenerActivos. En el archivo php se hace la logica de según el portfolio seleccionado (teniendo en cuenta el id) se muestren los activos correspondientes
  useEffect(() => {
    const obtenerIdPortafolios = async () => {
      if (isAuthenticated) {
        try {
          // Realizar una solicitud al servidor PHP para obtener los portafolios
          const response = await fetch('http://localhost/coinmanager/obtenerIdPortfolios.php');

          if (!response.ok) {
            // Manejar errores de la respuesta si es necesario
            console.error('Error al obtener los id de los portafolios:', response.statusText);
            return;
          }

          // Si la respuesta es exitosa, manejar la información recibida
          const data = await response.json();
          //Actualizar el estado de los id de los portafolios
          setIdPortfolios(data);

        } catch (error) {
          // Manejar errores de la solicitud fetch
          console.error('Error al obtener los portafolios:', error);
        }
      }
    }

    //Llamar a la función para obtener los portafolios
    obtenerIdPortafolios();
  }, [isAuthenticated, selectedPortfolio, portfolios]);

  //Obtenemos las monedas de la tabla Activos
  useEffect(() => {
    const obtenerActivos = async () => {
      try {
        const response = await fetch('http://localhost/coinmanager/obtenerActivos.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Puedes agregar encabezados adicionales si es necesario, como el token de autenticación
          },
          body: JSON.stringify({ selectedPortfolio, idPortfolio }),
        });

        if (!response.ok) {
          console.error('Error al obtener los activos:', response.statusText);
          return;
        }

        const data = await response.json();
        setAssets(data);

      } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
      }
    };

    // Llamar a la función para obtener los activos
    obtenerActivos();
  }, [selectedPortfolio, porcentaje]);

  //Función para obtener el balance de un portfolio y pasarselo a addPortfolio y a Balance
  useEffect(() => {
    const obtenerBalance = async () => {
      try {
        // Realizar una solicitud al servidor PHP para obtener el balance
        const response = await fetch('http://localhost/coinmanager/obtenerBalance.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ portfolios }),
        });
  
        if (!response.ok) {
          // Manejar errores de la respuesta si es necesario
          console.error('Error al obtener el balance:', response.statusText);
          return;
        }
  
        // Si la respuesta es exitosa, manejar la información recibida
        const data = await response.json();
  
        // Actualizar el estado del balance por portafolio
        const updatedBalances = {};
        let contador=0;
        data.forEach(item => {
          updatedBalances[contador] = item.portfolio_balance;
          contador++;         
        });
        
        setPortfolioBalances(updatedBalances);
      } catch (error) {
        // Manejar errores de la solicitud fetch
        console.error('Error al obtener el balance', error);
      }
    };
  
    // Llamar a la función para obtener el balance
    obtenerBalance();
  }, [portfolios]);
  
  //Función para actualizar el balance. Sirve para cuando se borra un activo se actualiza el balance. Se pasa como props a Assets.js. Se llama después de borrar un activo en Assets.js
  const actualizarPortfolioBalances = async () => {
    try {
      // Realizar una solicitud al servidor PHP para obtener el nuevo balance
      const response = await fetch('http://localhost/coinmanager/obtenerBalance.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portfolios }),
      });
  
      if (!response.ok) {
        // Manejar errores de la respuesta si es necesario
        console.error('Error al obtener el nuevo balance:', response.statusText);
        return;
      }
  
      // Si la respuesta es exitosa, manejar la información recibida
      const data = await response.json();
  
      // Actualizar el estado del balance por portafolio
      const updatedBalances = {};
      let contador = 0;
      data.forEach(item => {
        updatedBalances[contador] = item.portfolio_balance;
        contador++;
      });
  
      // Actualizar el estado de portfolioBalances
      setPortfolioBalances(updatedBalances);
    } catch (error) {
      // Manejar errores de la solicitud fetch
      console.error('Error al obtener el nuevo balance', error);
    }
  };

  // Función para actualizar los porcentajes. Sirve para cuando se borra un activo se actualiza el porcentaje. Se pasa como props a Assets.js. Se llama después de borrar un activo en Assets.js
  const actualizarPorcentajes = async () => {
    try {
      // Realizar una solicitud al servidor PHP para obtener los nuevos porcentajes
      const response = await fetch('http://localhost/coinmanager/obtenerPorcentajes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedPortfolio, idPortfolio }),
      });

      if (!response.ok) {
        // Manejar errores de la respuesta si es necesario
        console.error('Error al obtener los nuevos porcentajes:', response.statusText);
        return;
      }

      // Si la respuesta es exitosa, manejar la información recibida
      const data = await response.json();

      // Actualizar el estado de los porcentajes por portafolio
      const updatedPorcentajes = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          updatedPorcentajes[key] = data[key];
        }
      }
      
      // Actualizar el estado de los porcentajes
      setPorcentaje(updatedPorcentajes);
      
    } catch (error) {
      // Manejar errores de la solicitud fetch
      console.error('Error al obtener los nuevos porcentajes', error);
    }
  };


  //Obtener los portafolios para mostrarlos cuando el usuario inicie sesión
  useEffect(() => {
    const obtenerPortafolios = async () => {
      if (isAuthenticated) {
        try {
          // Realizar una solicitud al servidor PHP para obtener los portafolios
          const response = await fetch('http://localhost/coinmanager/obtenerPortfolios.php');

          if (!response.ok) {
            // Manejar errores de la respuesta si es necesario
            console.error('Error al obtener los portafolios:', response.statusText);
            return;
          }

          // Si la respuesta es exitosa, manejar la información recibida (es necesario quitar las keys del array de objetos que devuelve data y quedarnos solo con el nombre)
          const data = await response.json();

          const dataArray = data.map(item => item.portfolio_name);
          //Actualizar el estado de los portafolios
          setPortfolios(dataArray);
        } catch (error) {
          // Manejar errores de la solicitud fetch
          console.error('Error al obtener los portafolios:', error);
        }
      }
    }

    //Llamar a la función para obtener los portafolios
    obtenerPortafolios();
  }, [isAuthenticated]);


  return (
    <>
      <header>
        <Header/>
      </header>
      
      <main className="flex-container"> 

          <AddPortfolio selectedPortfolio={selectedPortfolio} setSelectedPortfolio={handlePortfolioSelect} portfolioBalances={portfolioBalances} portfolios={portfolios} setPortfolios={setPortfolios} idPortfolio={idPortfolio}/>

          <section className="general-assets flex-container">   

            {/* Balance y Activos por defecto */}
            {selectedPortfolio === null && (
              <>
              <Balance/>
              <Assets/>
              </>
            )}

            {/* DE MOMENTO SE ME HA OCURRIDO LIMITAR EL NÚMERO DE PORTFOLIOS QUE SE PUEDEN CREAR A 5.
                ASI PUEDO CONTROLAR QUE PORFOLIO SE ELIGE TENIENDO EN CUENTA EL INDICE.
                LE PASO POR PROPS EL PORTFOLIO SELECCIONADO AL BALANCE (No se si sirve de algo) 
                AÑADIR LA LIMITACIÓN DE PORTFOLIOS Y CREO QUE LA SECCION DE AÑADIR PORTAFOLIO QUEDA TERMINADA. */}

            {selectedPortfolio === 0 && (
              <>
              <Balance selectedPortfolio={selectedPortfolio} portfolioBalances={portfolioBalances[0]} assets={assets}/>
              <Assets assets={assets} setAssets={setAssets} setPortfolioBalances={actualizarPortfolioBalances} setPorcentaje={actualizarPorcentajes}/>
              </>
            )}

            {selectedPortfolio === 1 && (
              <>
              <Balance selectedPortfolio={selectedPortfolio} portfolioBalances={portfolioBalances[1]} assets={assets}/>
              <Assets assets={assets} setAssets={setAssets} setPortfolioBalances={actualizarPortfolioBalances} setPorcentaje={actualizarPorcentajes}/>
              </>
            )}       

            {selectedPortfolio === 2 && (
              <>
              <Balance selectedPortfolio={selectedPortfolio} portfolioBalances={portfolioBalances[2]} assets={assets}/>
              <Assets assets={assets} setAssets={setAssets} setPortfolioBalances={actualizarPortfolioBalances} setPorcentaje={actualizarPorcentajes}/>
              </>
            )}     

            {selectedPortfolio === 3 && (
              <>
              <Balance selectedPortfolio={selectedPortfolio} portfolioBalances={portfolioBalances[3]} assets={assets}/>
              <Assets assets={assets} setAssets={setAssets} setPortfolioBalances={actualizarPortfolioBalances} setPorcentaje={actualizarPorcentajes}/>
              </>
            )}     

            {selectedPortfolio === 4 && (
              <>
              <Balance selectedPortfolio={selectedPortfolio} portfolioBalances={portfolioBalances[4]} assets={assets}/>
              <Assets assets={assets} setAssets={setAssets} setPortfolioBalances={actualizarPortfolioBalances} setPorcentaje={actualizarPorcentajes}/>
              </>
            )}     
          </section>
          
      </main>

      <footer>  
        <Footer/>         
      </footer>
      </>
  );
}
