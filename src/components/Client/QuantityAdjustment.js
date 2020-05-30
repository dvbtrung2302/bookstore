import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import '../../css/Client/QuantityAdjustment.css';
import { CartContext } from '../../contexts/CartContext';

const QuantityAdjustment = (props) => {
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
      <div className="decrease adj" onClick={() => decreaseItem(product)}>
        <FontAwesomeIcon icon={faMinus} />
      </div>
      <div className="number">{!product ? 0 : product.quantity}</div>
      <div className="increase adj" onClick={() => increaseItem(product)}>
        <FontAwesomeIcon icon={faPlus}  />
      </div>
    </div>
  );
}

QuantityAdjustment.propTypes = {
  type: PropTypes.string,
  product: PropTypes.shape({
    quantity: PropTypes.number
  })
}

export default QuantityAdjustment;