import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import './css/QuantityAdjustment.css';
import { CartContext } from '../contexts/CartContext';

export default function(props) {
  const { type, product } = props;
  const { increaseItem, decreaseItem } = useContext(CartContext);
  return(
    <div 
      className={
        type ===  "cart" ? 
        "QuantityAdjustment cart-style" :
        "QuantityAdjustment"}
      onClick={(e) => e.preventDefault()}
    >
      <div className="decrease adj">
        <FontAwesomeIcon icon={faMinus} onClick={() => decreaseItem(product)}/>
      </div>
      <div className="number">{!product ? 0 : product.quantity}</div>
      <div className="increase adj">
        <FontAwesomeIcon icon={faPlus} onClick={() => increaseItem(product)} />
      </div>
    </div>
  );
}