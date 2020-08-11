import React, { useContext, useEffect, useState } from 'react';
import Chart from "react-apexcharts";

import '../../css/Admin/Target.css';
import LegendItems from './LegendItems';
import { AdminContext } from '../../contexts/AdminContext';

const Target = () => {
  const { orders } = useContext(AdminContext);
  const [ series, setSerires] = useState([0, 0]);
  const wTarget = 10000;
  const mTarget = 40000;

  useEffect(() => {
    let firstDay = new Date('2020/5/18');
    let currentDate = new Date();
    // get next week
    let nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    let nextMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, firstDay.getDate());
    
    // get next month
    if (firstDay.getMonth() === 11) {
      nextMonth = new Date(firstDay.getFullYear(), 0, firstDay.getDate());
    } 
    

    
    // temp variables
    let tempMAmount = 0;
    let tempWAmount = 0;

    // check 
    if ( currentDate === nextWeek) {
      firstDay = nextWeek;
      nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    if ( currentDate === nextMonth) {
      firstDay = nextMonth;
      nextMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, firstDay.getDate());
      if (firstDay.getMonth() === 11) {
       nextMonth = new Date(firstDay.getFullYear(), 0, firstDay.getDate());
      }
    }

    for (const order of orders) {
      const parts = order.date.split(/[\s,]+/);
      const orderDay = new Date(parts[0] + ' ' + parts[1] + ' ' + parts[2]);

      if (firstDay <= orderDay <= nextWeek) {
        tempWAmount += order.totalPrice;
      }

      if (firstDay <= orderDay <= nextMonth) {
        tempMAmount += order.totalPrice;
      }
    }

    const result = {
      percentWeek: ((tempWAmount / wTarget) * 100) >= 100 ? 100 : (tempWAmount / wTarget) * 100,
      percentMonth: ((tempMAmount / mTarget) * 100) >= 100 ? 100 : (tempMAmount / mTarget) * 100,
    }
    setSerires([result.percentWeek, result.percentMonth]);

  }, [orders])
  const options = {
    chart: {
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 3,
          size: '15%'
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '22px',
            color: 'rgb(8, 19, 115)'
          },
          value: {
            show: true,
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgb(22, 31, 106)',
            formatter: function (val) {
              return parseInt(val) + '%';
            }
          },
          colors: ['rgba(3, 211, 181, 0.85)','rgba(102, 109, 146, 0.85)']
        },
        
        track: {
          background: "#eee",
          strokeWidth: '100%',
          margin: 20, // margin is in pixels
        }
      }
    },
    fill: {
      colors: ['rgba(3, 211, 181, 0.85)','rgba(102, 109, 146, 0.85)']
    },
    stroke: {
      show: true,
      lineCap: 'round',
      width: 2
    },
    labels: ['Week', 'Month'],
  };

  const legend = [
    { title: 'Weekly Targets', dot: 'rgba(3, 211, 181, 0.85)', amount: wTarget },
    { title: 'Monthly Targets', dot: 'rgba(102, 109, 146, 0.85)', amount: mTarget }
  ];


  return(
    <div className="Target admin-col">
      <h3 className="bt-header">Target</h3>
      <Chart 
        options={options}
        series={series}
        type="radialBar"
        height={450}
      /> 
      <div className="legend">
        { 
          legend.map(item => <LegendItems key={item.title} title={item.title} dot={item.dot} amount={item.amount} />)
        }
      </div>
    </div>
  );
}

export default Target;