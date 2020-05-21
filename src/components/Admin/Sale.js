import React, { useContext, useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import '../../css/Admin/Sale.css';
import { AdminContext } from '../../contexts/AdminContext';

const Sale = () => {
  const { orders, revenue } = useContext(AdminContext);
  const [ data, setData ] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => { 
    let temp = [];
    let result = [];
    for (const order of orders) {
      const parts = order.date.split(/[\s,]+/);
      const orderDay = new Date(parts[0] + ' ' + parts[1] + ' ' + parts[2]);
      temp.push({ month: orderDay.getMonth(), totalPrice: order.totalPrice });      
    }
    const months = temp.reduce((current, month) => {
      if(month.month in current) {
        current[month.month]++;
      } else {
        current[month.month] = 1;
      }
      return current;
    }, {});

    for (let i = 0; i <= 11; i++ ) {
      for (const month in months) {
        if (i === parseInt(month)) {
          result[i] = months[month];
          break;
        }
        result[i] = 0;
      }  
    }
   
    setData(result);

  }, [orders])

  const series = [{
    name: 'Sale',
    data: data
  }];
  const options = {
    colors : ['rgba(3, 211, 181, 0.85)'],
    grid: {
      show: false
    },
    chart: {
      toolbar: {
        show: false
      },
      type: 'bar',
      height: 350,
      foreColor: 'rgb(22, 31, 106)'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          style: {
            fontSize: '16px',
          }
        },
        horizontal: false,
        columnWidth: '60%'
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      labels: {
        style: {
          fontSize: '16px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '16px'
        },
        formatter: (val) => {
          return Math.trunc(val)
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['rgba(3, 211, 181, 0.85)']
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        title: {
          formatter: (seriesName) => seriesName,
        },
        formatter: undefined
      }
    }
  };
  return(
    <div className="Sale admin-col">
      <div className="header">
        <h3 className="bt-header">Sale History</h3>
        <div className="total">${revenue}</div>
      </div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default Sale;
