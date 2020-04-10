import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag ,faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import './css/CartItems.css';
import QuantityAdjustment from './QuantityAdjustment';
import { CartContext } from '../contexts/CartContext';

export default function() {
  const { isCartClicked, setCartClicked } = useContext(CartContext);
  return(
    <div className={isCartClicked ? "CartItems w-sm-100 c-show" : "CartItems"}>
      <div className="header">
        <div className="items-amount">
          <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
          2 items
        </div>
        <FontAwesomeIcon icon={faTimes} onClick={() => setCartClicked(false)}/>
      </div>
      <div className="body">
        <div className="item">
          <QuantityAdjustment type="cart"/>
          <div className="img">
            <img src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755126/Books/creative_writing_fkuofh.png" alt="" />
          </div>
          <div className="info">
            <div className="title">Through The Yiddish Looking Glass</div>
            <div className="price">$20</div>
            <div className="quantity">1 pc(s)</div>
          </div>
          <div className="total-price">$20</div>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="item">
          <QuantityAdjustment type="cart"/>
          <div className="img">
            <img src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755126/Books/creative_writing_fkuofh.png" alt="" />
          </div>
          <div className="info">
            <div className="title">Through The Yiddish Looking Glass</div>
            <div className="price">$20</div>
            <div className="quantity">1 pc(s)</div>
          </div>
          <div className="total-price">$20</div>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
        
      <Link to="/" className="footer">
        <span>Checkout</span>
        <div className="total">
          $990.00
        </div>
      </Link>
    </div>
  );
}