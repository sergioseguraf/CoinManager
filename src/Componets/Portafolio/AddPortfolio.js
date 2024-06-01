import React, { useState } from 'react';
import deleteIcon from '../../img/delete-icon.svg';
import { MagicMotion } from "react-magic-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LuInfo } from 'react-icons/lu';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export const AddPortfolio = ({selectedPortfolio,setSelectedPortfolio,portfolioBalances, setPortfolios, portfolios, idPortfolio}) => {

  const [showForm, setShowForm] = useState(false);
  const [portfolioName, setPortfolioName] = useState('');

  //Mensaje toast
  const notify = () => toast.success('Portfolio borrado', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  //Estado para manejar si se muestra el formulario o no cuando se pulsa el botón de añadir portafolio
  const toggleForm = () => {
    setShowForm(!showForm);
  }

  //Manejador para cambiar el nombre del portafolio. Se guarda en el estado el nombre
  const handleInputChange = (e) => {
    setPortfolioName(e.target.value);
  }


  //Manejador para guardar el nuevo portafolio cuando se pulsa el boton guardar
  const handleSave = async (e) => {
    e.preventDefault();  // Evitar la recarga de la página por defecto

    if (portfolios.length === 5) {
      return;
    }

    if (portfolioName.length === 0) {
      return;
    }

    try {
      // Realizar la solicitud al servidor PHP para guardar en la base de datos
      const response = await fetch('http://localhost/coinmanager/guardarPortfolio.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portfolioName }),
      });

      if (!response.ok) {
        // Manejar errores de la respuesta si es necesario
        console.error('Error al guardar en la base de datos:', response.statusText);
        return;
      }

      // Si la operación de inserción fue exitosa, actualiza el estado y restablece el formulario
      setPortfolios([...portfolios, portfolioName]);
      setPortfolioName('');
      setShowForm(false);
    } catch (error) {
      // Manejar errores de la solicitud fetch
      console.error('Error al realizar la solicitud fetch:', error);
    }
  };

  //Manejador para el borrado de portafolios. Se filtra el array de portafolios y nos quedamos con los portafolios que no coincidan con el indice
  const handleDelete = async (index, e) => {
    //Quito el comportamiento por defecto para que no vuelva a cargar la página
    e.preventDefault();
    //Se evita que el click se propague al contenedor padre, así al hacer click en el icono de borrar no se muestran los componentes, simplemente se borra
    e.stopPropagation();

    //Se filtra el array de portafolios
    const updatedPortfolios = portfolios.filter((_, i) => i !== index);

    //Se obtiene el nombre del portafolio y seleccionado y el id para borrarlo a continuación
    const deletedPortfolio = portfolios.filter((_, i) => i == index);
    const idDeletedPortfolio = idPortfolio.filter((_, i) => i == index);

    try {
      // Realizar la solicitud al servidor PHP para borrar en la base de datos
      const response = await fetch('http://localhost/coinmanager/borrarPortfolio.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deletedPortfolio, idDeletedPortfolio }),
      });

      if (!response.ok) {
        // Manejar errores de la respuesta si es necesario
        console.error('Error al borrar en la base de datos:', response.statusText);
        return;
      }

      // Si la operación de inserción fue exitosa, actualizamos los portfolios y actualizamos el portfolio seleccionado para que no se escoja ninguno cuando se borra
      setSelectedPortfolio(null);
      setPortfolios(updatedPortfolios);
      notify();

    } catch (error) {
      // Manejar errores de la solicitud fetch
      console.error('Error al realizar la solicitud fetch:', error);
    }
    
  }

  return (
    <>
    <MagicMotion>
    <section className="add-portfolio">
        {portfolios.map((portfolio, index) => (
            <div key={index} className={`portfolio-box ${selectedPortfolio === index  ? 'selected' : ''}`} onClick={ () => setSelectedPortfolio(index)}>
              <div className='portfolio-name-amount'>
                <span className='portfolio-name'>{portfolio}</span>
                <p className='portfolio-amount' title="Capital invertido">
                  {portfolioBalances[index] !== undefined
                    ? `CI: ${parseFloat(portfolioBalances[index]).toFixed(2)} €`
                    : 'CI: 0.00 €'}                   
                </p>
              </div>
              <a onClick={(e) => handleDelete(index, e)} href="/#"><img id='delete-icon' src={deleteIcon} alt="borrar"/></a>
            </div>
        ))}

        <hr/>

        <input
            id='add-portfolio-button'
            type="submit"
            name="add-portfolio"
            value="Añadir Portafolio"
            onClick={toggleForm}
        />
        
        {showForm && (
            <div className='add-portfolio-input-save'>             
              {portfolios.length === 5 ? (
                <p className='portfolio-limit-message'>Solo puedes tener un máximo de <span>5 portafolios. </span>Elimina uno antes de añadir otro.</p>
              ) : (
                <form onSubmit={handleSave} className='add-portfolio-input-save'>
                  <input
                    type="text"
                    id='add-portfolio-input-button'
                    placeholder="Nombre del Portafolio"
                    value={portfolioName}
                    onChange={handleInputChange}
                    maxLength="20"
                  />
                  <button id='add-portfolio-save-button'>Guardar</button>
                </form>
              )} 
            </div>
        )}
    </section>
    </MagicMotion>
    <ToastContainer />
    </>
  );
}



