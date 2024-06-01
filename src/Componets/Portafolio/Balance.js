import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { BarElement } from 'chart.js';
import axios from 'axios';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler
)

export const Balance = ({selectedPortfolio, portfolioBalances, assets}) => {//Recivo por props el portfolio seleccionado (No se si sirve de algo)

  //Estado donde se guarda el balance de un portfolio teniendo en cuenta las fluctuaciones del mercado
  const [nuevoBalance, setNuevoBalance] = useState(portfolioBalances);
  const [preciosActuales, setPreciosActuales] = useState({});

  //Recogemos los datos de la api de coinranking
  useEffect(() => {
    const fetchPreciosActuales = async () => {
      try {
        const response = await axios.get('https://api.coinranking.com/v2/coins?timePeriod=7d&limit=100');
        const coins = response.data.data.coins;

        // Mapear nombres de monedas a precios actuales
        const preciosActualesMap = {};
        coins.forEach((coin) => {
          preciosActualesMap[coin.name] = parseFloat(coin.price).toFixed(2);
        });

        setPreciosActuales(preciosActualesMap);
      } catch (error) {
        console.error('Error fetching precios actuales:', error);
      }
    };

    fetchPreciosActuales();
  }, []);

  //Recalcular el balance para tener en cuenta las fluctiaciones. PB = suma(cantidad x (PA-PC))
  useEffect(() => {
    if (portfolioBalances == 0) {
      setNuevoBalance(0);
    }
    
    if (assets && Object.keys(preciosActuales).length > 0) {
      // Calcular la suma de las fluctuaciones individuales
      const fluctuacionTotal = assets.reduce((total, asset) => {
        const precioActualMoneda = preciosActuales[asset.name] || 0; // Si no se encuentra el precio, asumir 0
        const fluctuacionAsset = asset.quantity * (parseFloat(precioActualMoneda) - asset.purchase_price);
        return total + fluctuacionAsset;
      }, 0);
      
      if (fluctuacionTotal) {    
        // Actualizar el nuevo balance con la fluctuacionTotal
        setNuevoBalance(parseInt(portfolioBalances) + fluctuacionTotal);
      }
    }
  }, [portfolioBalances, assets, preciosActuales]);


  // Calcular el balance de cada moneda
  const balances =  assets && assets.map((asset) => {
    const precioActualMoneda = preciosActuales[asset.name] || 0; // Si no se encuentra el precio, asumir 0
    const balanceMoneda = parseFloat(asset.quantity) * parseFloat(precioActualMoneda);
    
    return balanceMoneda;
  });

  // Datos de la gráfica
  const chartData = {
    labels: assets && assets.map((asset) => asset.name), // Nombres de las monedas
    datasets: [
      {
        label: 'Valor Actual',
        data: balances && balances.length > 0 ? balances : [0], 
        backgroundColor: 'rgba(252, 95, 25, 0.3)', //Color de las barras
        borderColor: '#fC5C19',
        borderWidth: 1,
        barThickness: 100,
      },
    ],
  };

  //Opciones de la gráfica
  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}€`,
          color: '#c0c1c2',
          backdropColor: '#c0c1c2',
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: '#c0c1c2',
          font: {
            size: 18,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };
  
  //Cálculo del ROI
  const costoInicial = parseFloat(portfolioBalances);
  const ganancia = parseFloat(nuevoBalance) - costoInicial;
  const ROI = costoInicial !== 0 ? (ganancia / costoInicial) * 100 : 0;
  
  return (
    <div className="balance">
        <h3>Balance</h3>
        <div className='balance-data'>
          <h3>{nuevoBalance ? parseFloat(nuevoBalance) : '0.00'} €</h3>
          <span title='Retorno de la inversión' style={{ color: ROI > 0 ? 'green' : 'red' }}> {ROI ? `${ROI > 0 ? '+' : ''}${ROI.toFixed(2)}%` : '0.00%'}</span>
        </div>
        {selectedPortfolio !== undefined && (
          <Bar data={chartData} options={chartOptions} />
        )}

    </div>
  )
}

/* <Line data={data} options={options} /> */

 /*Manejador para modificar el aumento de dinero semanal de un portafolio
  const handleWeekBalance = (percent) => {
    setWeekBalance(percent);
  } 

  //Manejador para modificar las ganancias en porcentaje de un portafolio
  const handlePercentBalance = (balance) => {
    setPercentBalance(balance);
  } 


  // ESTO ES LO QUE ESTUVISTE PROVANDO. FUNCIONA PERO CUANDO BORRAS NO CUANDO AÑADES
  //Estado donde se guarda el array de balances para los datos de la gráfica
  const [arrayBalances, setArrayBalances] = useState([]);

  useEffect(() => {
    // Utilizamos el spread operator para crear una nueva copia del arrayBalances
    setArrayBalances((prevBalances) => [...prevBalances, portfolioBalances]);
  }, [portfolioBalances]);

    //console.log(portfolioBalances);

    <span> +{hoursBalance}€ [{percentBalance}%]</span>
  */