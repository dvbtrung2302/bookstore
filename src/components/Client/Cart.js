import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import '../../css/Client/Cart.css';
import { CartContext } from '../../contexts/CartContext';

export default function() {
  const { 
    setCartClicked, 
    cartItems, 
    totalPrice 
  } = useContext(CartContext);
  return(
    <div 
      className="Cart"
      onClick={() => setCartClicked(true)}
    >
      <div className="item-amount">
        <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
        {cartItems.length} {cartItems.length < 2 ? 'item' : 'items'}
      </div>
      <div className="total-price">
        <p>${totalPrice}.00</p>
      </div>
    </div>
  );
}