import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import '../../css/Admin/Client.css';
import { AdminContext } from '../../contexts/AdminContext';
import LegendItems from './LegendItems';

const Client = () => {
  const { users } = useContext(AdminContext);
  const dots = [
    'rgb(33, 112, 255)',
    'rgb(41, 202, 228)',
    'rgb(102, 109, 146)',
    'rgb(3, 211, 181)'
  ];
  
  const cities = users.reduce((currentUser, user) => {
    if(user.city in currentUser) {
      currentUser[user.city]++;
    } else {
      currentUser[user.city] = 1;
    }
    return currentUser;
  }, {});
  let temp = [];
  for (const city in cities) {
    temp.push({city, amount: cities[city] });
  }

  const result = dots.map((dot, index) => {
    return { ...temp[index], dot }
  })

  return(
    <div className="Client admin-col">
      <div className="main">
        <div className="title">
          <div className="admin-header">Total Client</div>
          <div className="amount">{users.length}</div>
        </div>
        <div className="client-progress">
          {
            result.map(client => {
              if (client.amount) {
                return (
                  <CityProgress 
                    key={client.dot}
                    title={client.city} 
                    amount={client.amount}
                    color={client.dot}
                    percent={parseInt((client.amount / users.length) * 100)}
                  />
                )
              } else {
                return null;
              }
            })
          }
        </div>
      </div>
      <div className="legend">
        { 
          result.map(client => {
            if (client.amount) {
              return (
                <LegendItems key={client.dot} title={client.city} dot={client.dot} amount={client.amount} type="client" />
              )
            } else {
              return null;
            }
          })
        }
      </div>
    </div>
  );
}

const CityProgress = (props) => {
  const { 
    title,
    amount,
    color, 
    percent
  } = props;
  return(
    <div className="CityProgress">
      <div className="city-name">
        {title}
        <span>({amount})</span>
      </div>
      <div className="progress-container">
        <div className="progress-wrapper">
          <div 
            className="progress"
            style={{
              backgroundColor: `${color}`,
              width: `${percent}%`,
              height: '100%',
              borderRadius: '10px'
            }} 
          ></div>
        </div>
        <div className="percent">{percent}%</div>
      </div>
    </div>
  );
}

CityProgress.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  color: PropTypes.string,
  percent: PropTypes.number
}

export default Client;