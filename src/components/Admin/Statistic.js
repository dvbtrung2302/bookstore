import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import '../../css/Admin/Statistic.css';

const Statistic = (props) => {
  const { 
    title,
    background,
    color,
    icon,
    data 
  } = props;
  const name = title.split(' ');
  return(
    <div className="Statistic admin-col h-100">
      <div className="header">
        <div className="title">
          <div className="bt-header" style={{color:"rgb(22, 31, 106)"}}>
            {title}
          </div>
          <div>(Last 30 Days)</div>
        </div>
        <div className="icon" style={{backgroundColor:`${background}`, color:`${color}`}}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      <div className="number">
        <div className="amount">{title === 'Total Revenue' && "$"}{data}</div>
        <div className="up-down" style={{color:'rgb(3, 211, 181)'}}>
          <div className="up">
            <FontAwesomeIcon icon={faArrowUp} />
            {name[1]} up 
          </div>
          <span>(previous 30 days)</span>
        </div>
      </div>
    </div>
  );
}

Statistic.propTypes = {
  title: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.object,
  data: PropTypes.number
}

export default Statistic;