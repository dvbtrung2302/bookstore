import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import './css/CartBtn.css';

export default function() {
  return(
    <div className="CartBtn">
      <button className="btn">
        <FontAwesomeIcon icon={faShoppingBasket} />
          <p>Add to cart</p>
      </button>
    </div>
  );
}