import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Footer } from '../Footer/Footer.js';
import { Header } from '../Header/Header.js';
import './activos-styles.css';
import { Sparklines, SparklinesLine, SparklinesSpots  } from 'react-sparklines';
import loader from '../../img/loader.gif';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from '@mui/material';


export const ActivosPage = () => {
  //Estado para recoger las criptomonedas en un array
  const [cryptos, setCryptos] = useState([]);
  //Estado para manejar el loader mientras espera respuesta
  const [loading, setLoading] = useState(true);
  //Estado para manejar si el contenedor de elegir portafolios esta visible o no
  const [isAddPortfolioVisible, setIsAddPortfolioVisible] = useState(false);
  //Estado para obtener la moneda seleccionada cuando se pulsa el botón de añadir
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedCryptoIcon, setSelectedCryptoIcon] = useState(null);
  //Estado para la busqueda (Lo que el usuario introduce)
  const [search, setSearch] = useState ('');
  //Estado donde se guardan los portafolios en un array (también está en portfolioPage)
  const [portfolios, setPortfolios] = useState([]);
  //Estado para el portafolio seleccionado (también está en portfolioPage)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  //Estado donde se guardan los id_portfolios
  const [idPortfolio, setIdPortfolios] = useState([]);
  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 50;
  
  //Mensaje toast
  const notify = () => toast.success(selectedCrypto + ' se ha añadido correctamente al portfolio ' + portfolios[selectedPortfolio], {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  //Cada vez que se escribe una letra se actualiza el estado con lo que se está escribiendo
  const searchCrypto  = (e) => {
    setSearch(e.target.value);
  };

  //Array de cryptos filtradas
  let filteredCrypto = [];
  //Si no se encuentra ninguna crypto con lo que el usuario ha escrito el array filtrado será el array comnpleto.
  if (!search) {
    filteredCrypto = cryptos;
  } else {
    //Si se encuentra filtramos
    filteredCrypto = cryptos.filter((crypto) => 
    crypto.name.toLowerCase().includes(search.toLowerCase()));
  }
  
  //Recogemos los datos de la api de coinranking
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.coinranking.com/v2/coins?timePeriod=7d&limit=${limit}&offset=${(currentPage - 1) * limit}`);
      const coins = response.data.data.coins;
      setCryptos(coins);
      setLoading(false); // Cambia el estado a false cuando se completa la carga
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Cambia el estado incluso en caso de error
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  //Manejador para cuando se pulsa el boton de añadir. Cambia el estado a la visibilidad del botón y selecciona la cripto sobre la que se ha pulsado el botón
  const showContainer = (crypto, icon) => {
    setSelectedCrypto(crypto);
    setSelectedCryptoIcon(icon);
    setIsAddPortfolioVisible(!isAddPortfolioVisible);
  };

  //Obtener los portafolios para mostrarlos cuando el usuario pulse en el boton de añadir
  useEffect(() => {
    const obtenerPortafolios = async () => {

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

    //Llamar a la función para obtener los portafolios
    obtenerPortafolios();
  }, [isAddPortfolioVisible]);

  //Obtener los id_portfolios para guardarlos en un estado y pasarselos a la función handleAddCrypto. En el archivo php se hace la logica de según el portfolio seleccionado se obtengan los portfolio_id (para seleccionar el portfolio donde se quiere añadir la moneda)
  useEffect(() => {
    const obtenerIdPortafolios = async () => {
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

    //Llamar a la función para obtener los portafolios
    obtenerIdPortafolios();
  }, []);

  //Manejador para añadir una moneda a un portfolio
  const handleAddCrypto = async (e) => {
    e.preventDefault(); 

    // Obtener los datos del formulario que ha introducido el usuario (cantidad y precio compra)
    const quantity = e.target.elements.quantity.value;
    const purchasePrice = e.target.elements['purchase-price'].value;

    //Obligar a que escoja un portfolio (selectedPortfolio tiene que estar entre 0 - 4) antes de enviar el formulario
    if (selectedPortfolio == null) {
      //Mostrar un mensaje de error 
      toast.error('Crea o selecciona un portfolio', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    }

    //Asegurarse de que se han proporcionado cantidad y precio de compra
    if (!quantity || !purchasePrice) {
      //Mostrar un mensaje de error 
      toast.error('Añade precio y cantidad de compra', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    }

    // Datos a enviar al servidor PHP
    const requestData = {
      selectedPortfolio: selectedPortfolio,
      name: selectedCrypto,
      quantity: parseFloat(quantity),
      purchase_price: parseFloat(purchasePrice),
      portfolio_id: idPortfolio,
    };

    try {
      // Realizar la solicitud al servidor PHP para guardar en la base de datos
      const response = await fetch('http://localhost/coinmanager/guardarMoneda.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // Manejar errores de la respuesta si es necesario
        console.error('Error al guardar en la base de datos:', response.statusText);
        return;
      }

      // Si la operación de inserción fue exitosa cierro el formulario ¿TENGO QUE HACER ALGO MÁS?
      showContainer(null);

    } catch (error) {
      // Manejar errores de la solicitud fetch
      console.error('Error al realizar la solicitud fetch:', error);
    }

    //Toast si todo ha ido bien
    notify();
  };

  //Función para la flecha para subir hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //Función para manejar el cambio de página en la paginación
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };  

  return (
    <>
      <header>
        <Header search={search} searchCrypto={searchCrypto} />
      </header>

      <main className='activosPage-main'>
        {loading ? (
            // Renderiza el loader mientras se cargan los datos
            <div className="activosPage-loader"><img src={loader} alt='Cargando...'/></div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Volumen (24h)</th>
                  <th>Cap. de Mercado</th>
                  <th>7d %</th>
                  <th>Últimos 7 días</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrypto.map((crypto, index) => (           
                  <tr key={index}>
                    <td>{crypto.rank}</td>
                    <td>
                      <div className='cryptoNameContainer'>
                        <img className='cryptoImg' src={crypto.iconUrl} alt={crypto.name} />
                        <p>{crypto.name}</p>
                        <p className='cryptoSymbol'>{crypto.symbol}</p>
                      </div>
                    </td>
                    <td>${parseFloat(crypto.price).toFixed(2)}</td>
                    <td>${parseFloat(crypto.marketCap).toLocaleString()}</td>
                    <td>${parseFloat(crypto['24hVolume']).toLocaleString()}</td>
                    {/* Comprobar si el cambio es positivo o negativo para ponerlo en verde o rojo */}
                    <td style={{ color: crypto.change > 0 ? 'green' : 'red' }}>{crypto.change}%</td>
                    <td>
                      <Sparklines data={crypto.sparkline.filter(value => value !== null)} limit={21} margin={4}>
                        <SparklinesLine style={{ fill: "none" }} />
                        <SparklinesLine color={crypto.color} />
                        <SparklinesSpots />
                      </Sparklines>     
                    </td>
                    <td>
                      <button onClick={() => showContainer(crypto.name, crypto.iconUrl)} id='add-crypto-button'>Añadir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         )}
         {/* Animación para cuando se pulsa el botón de añadir.
             Si isAddPortfolioVisible se muestra con el efecto de aparecer.
             Se muestra también una cruz en la esquina que cambiua el estado también, haciendo que se cierre la ventana 
          */}
         <AnimatePresence>
          {isAddPortfolioVisible && (
            <motion.div className='add-portfolio-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className='close-button' onClick={() => showContainer(null)}>
                <FaTimes />
              </div>
              <h3 id='add-portfolio-container-title'>Elige el portafolio donde quieras añadir <br></br> <span>{selectedCrypto}</span> <br></br> <img id='add-portfolio-container-cryptoImg' src={selectedCryptoIcon} alt={crypto.name} /></h3>
              
              {/* Mostrar los portafolios disponibles */}
              <section className='activos-portfolio-container'>
                {portfolios.map((portfolio, index) => (
                    <div key={index} className={`activos-portfolio-box ${selectedPortfolio === index  ? 'activos-selected' : ''}`} onClick={ () => setSelectedPortfolio(index)}>
                      <div className='activos-portfolio-name-amount'>
                        <span className='activos-portfolio-name'>{portfolio}</span>
                      </div>
                    </div>
                ))}
              </section>
              
              <form className='add-portfolio-form' onSubmit={handleAddCrypto}>
                <label className='add-portfolio-container-label' htmlFor='quantity'>Cantidad:</label>
                <input className='add-portfolio-container-input' type='number' id='quantity' name='quantity' />

                <label className='add-portfolio-container-label' htmlFor='purchase-price'>Precio de compra:</label>
                <input className='add-portfolio-container-input' type='number' id='purchase-price' name='purchase-price' />

                <button id='add-portfolio-container-button' type='submit'>Añadir</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>       
      </main>

      <Pagination id="paginacion" count={2} variant="outlined" shape="rounded" onChange={handlePageChange} page={currentPage}/>
{console.log((currentPage - 1) * limit)}
      <IoArrowUpCircleOutline onClick={scrollToTop} id='flecha-arriba' />

      <footer>
        <Footer/>
      </footer>

      <ToastContainer />
    </>
  );
};


