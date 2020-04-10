import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import './css/QuantityAdjustment.css';

export default function(props) {
  const { type } = props;
  return(
    <div 
      className={
        type ===  "cart" ? 
        "QuantityAdjustment cart-style" :
        "QuantityAdjustment"}>
      <div className="increase adj">
        <FontAwesomeIcon icon={faMinus} />
      </div>
      <div className="number">10</div>
      <div className="decrease adj">
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
}