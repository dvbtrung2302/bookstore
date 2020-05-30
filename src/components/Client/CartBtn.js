import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import '../../css/Client/CartBtn.css';
import { CartContext } from '../../contexts/CartContext';
import QuantityAdjustment from './QuantityAdjustment';

const CartBtn = (props) => {
  let { type, product } = props;
  const { addToCart, cartItems, setCartClicked } = useContext(CartContext);
  
  const isExists = (cartItems = [], item = {}) => {
    for (let cartItem of cartItems) {
      if (cartItem._id === item._id) {
        return cartItem;
      }
    }
    return false;
  }

  if (isExists(cartItems, product)) {
    product = isExists(cartItems, product);
  }

  return(
    <div className="CartBtn">
      {
        product.quantity ? <QuantityAdjustment product={product} /> :
        <button 
          className={type === 'related' ? 'btn related' : 'btn'}
          onClick={(e) => {addToCart(product); e.preventDefault(); setCartClicked(true, true)}}
        >  
          <FontAwesomeIcon icon={faShoppingBasket} />
            { 
              type === 'related' ?
              <p>Cart</p> :
              <p>Add to cart</p> 
            }
        </button> 
      }
    </div>
  );
}

CartBtn.propTypes = {
  type: PropTypes.string,
  product: PropTypes.object
}

export default CartBtn;