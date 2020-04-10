import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import './css/CartBtn.css';
import { CartContext } from '../contexts/CartContext';

export default function(props) {
  const { type, product } = props;
  const { addToCart } = useContext(CartContext);
  return(
    <div className="CartBtn">
      <button 
        className={type === 'related' ? 'btn related' : 'btn'}
        onClick={() => addToCart(product)}
      >  
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