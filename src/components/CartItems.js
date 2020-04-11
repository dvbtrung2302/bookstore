import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag ,faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import './css/CartItems.css';
import QuantityAdjustment from './QuantityAdjustment';
import { CartContext } from '../contexts/CartContext';

export default function() {
  const { 
    isCartClicked, 
    setCartClicked,
    cartItems,
    totalPrice,
    removeItem   
  } = useContext(CartContext);
  return(
    <div className={isCartClicked ? "CartItems w-sm-100 c-show" : "CartItems"}>
      <div className="header">
        <div className="items-amount">
          <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
          {cartItems.length} {cartItems.length < 2 ? 'item' : 'items'}
        </div>
        <FontAwesomeIcon icon={faTimes} onClick={() => setCartClicked(false)}/>
      </div>
        <div className="body">
          { 
            cartItems.length === 0 && <span style={{
              fontSize:"15px",
              fontWeight:"700",
              color:"rgb(119, 121, 140)",
              display:"block",
              width:"100%",
              textAlign:"center",
              padding:"40px 0px"
            }}>No products found.</span>
          }
          {
            cartItems.map(item => 
              <div key={item._id} className="item">
                <QuantityAdjustment type="cart" product={item}/>
                <div className="img">
                  <img src={item.image} alt="" />
                </div>
                <div className="info">
                  <div className="title">{item.title}</div>
                  <div className="price">${item.price} </div>
                  <div className="quantity">{item.quantity} pc(s)</div>
                </div>
                <div className="total-price">${item.quantity * item.price}</div>
                <FontAwesomeIcon icon={faTimes} className="ml-4" onClick={() => removeItem(item)} />
              </div>
            )
          }
      </div>
        
      <Link to="/" className="footer">
        <span>Checkout</span>
        <div className="total">
          ${totalPrice}.00
        </div>
      </Link>
    </div>
  );
}