import { LuInfo } from 'react-icons/lu';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { SearchBar } from '../Header/SearchBar';
import deleteIcon from '../../img/delete-icon.svg';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const Assets = ({ assets, setAssets, setPortfolioBalances, setPorcentaje }) => {

  //Estado para la busqueda (Lo que el usuario introduce)
  const [search, setSearch] = useState ('');

  //Cada vez que se escribe una letra se actualiza el estado con lo que se está escribiendo
  const searchCrypto  = (e) => {
    setSearch(e.target.value);
  };

  //Array de cryptos filtradas
  let filteredAssets = [];
  //Si no se encuentra ninguna crypto con lo que el usuario ha escrito el array filtrado será el array comnpleto.
  if (!search) {
    filteredAssets = assets;
  } else {
    //Si se encuentra filtramos
    filteredAssets = assets.filter((crypto) => 
    crypto.name.toLowerCase().includes(search.toLowerCase()));
  }

  //Mensaje toast
  const notify = () => toast.success('Moneda borrada', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  // Función para manejar el borrado de un activo
  const handleDeleteAsset = async (id, event, index) => {

    event.preventDefault(); // Prevenir la recarga de la página

    //Se filtra el array de monedas quitando del array las monedas que coindidan con el indice de la seleccionada (será la moneda borrada)
    const updatedAssets = assets.filter((_, i) => i !== index);
    
    try {
      // Realizar la solicitud al servidor PHP para borrar en la base de datos
      const response = await fetch('http://localhost/coinmanager/borrarActivo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        console.error('Error al borrar el activo:', response.statusText);
        return;
      }

      //Actualizar estados del balance, de los activos y de porcentaje
      setPortfolioBalances();
      setPorcentaje();
      setAssets(updatedAssets);
      
    } catch (error) {
      console.error('Error al realizar la solicitud fetch:', error);
    }
  };

  return (
    <div className="assets">
      <div className="assets-options">
        <h3>Activos</h3>
        <div>
          <SearchBar search={search} searchCrypto={searchCrypto} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio Compra</th>
            <th>
              Porcentaje
              <span data-tooltip-id="span">
                <LuInfo />
              </span>
              <ReactTooltip
                style={{ color: '#c0c1c2', backgroundColor: '#141518', marginLeft: 20 }}
                id="span"
                place="top"
                content="Porcentaje de la moneda respecto a tu portafolio"
              />
            </th>
            <th>Total(€)
              <span data-tooltip-id="span2">
                <LuInfo />
              </span>
              <ReactTooltip
                style={{ color: '#c0c1c2', backgroundColor: '#141518', marginLeft: 20 }}
                id="span2"
                place="top"
                content="Total invertido"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets && filteredAssets.map((asset, index) => (
            <tr key={index}>
              <td>{asset.name}</td>
              <td>{asset.quantity}</td>
              <td>{asset.purchase_price}</td>
              <td>{asset.percentage} %</td>
              <td>{asset.total}</td>
              <td>
                <a onClick={(e) => {handleDeleteAsset(asset.id, e, index); notify();}} id='deleteAssetButton'>
                  <img id='delete-icon' src={deleteIcon} alt="borrar"/>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

