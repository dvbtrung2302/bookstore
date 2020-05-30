import React from 'react';
import PropTypes from 'prop-types';

import '../../css/Client/Order.css';
import OrderDetails from './OrderDetails';

const Order = (props) => {
  const { i, index, handleClick, order, show } = props;
  return(
    <div className={ i === index ? "Order order-active" : "Order"}>
      <div className="w-100" onClick={() => {handleClick(index, order) }}>
        <div className="header">
          Order#{index + 1}
        </div>
        <div className="body">
          <div className="order-date">
            Order Date:
            <span>{order.date}</span>
          </div>
          <div className="order-id">
            Order Id: 
            <span>{order._id}</span>
          </div>
          <div className="total-price">
            Total Price:
            <span>${order.totalPrice}.00</span>
          </div>
        </div>
      </div>
      {
        <OrderDetails i={i} order={order} mobile={true} index={index} show={show} />
      }
    </div>
  );
}

Order.propTypes = {
  i: PropTypes.number,
  index: PropTypes.number,
  handleClick: PropTypes.func,
  order: PropTypes.shape({
    date: PropTypes.string,
    _id: PropTypes.string,
    totalPrice: PropTypes.number
  }),
  show: PropTypes.bool
}

export default Order;