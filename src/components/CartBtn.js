import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import './css/CartBtn.css';

export default function(props) {
  const { type } = props;
  return(
    <div className="CartBtn">
      <button className={type === 'related' ? 'btn related' : 'btn'}>
        <FontAwesomeIcon icon={faShoppingBasket} />
          { 
            type === 'related' ?
            <p>Cart</p> :
            <p>Add to cart</p> 
          }
      </button>
    </div>
  );
}