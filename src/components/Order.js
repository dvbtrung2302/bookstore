import React from 'react';

import '../css/Order.css';
import OrderDetails from '../components/OrderDetails';

export default (props) => {
  
  return(
    <div className={ props.i === props.index ? "Order order-active" : "Order"}>
      <div className="w-100" onClick={() => {props.handleClick(props.index, props.order) }}>
        <div className="header">
          Order#{props.index + 1}
        </div>
        <div className="body">
          <div className="order-date">
            Order Date:
            <span>{props.order.date}</span>
          </div>
          <div className="order-id">
            Order Id: 
            <span>{props.order._id}</span>
          </div>
          <div className="total-price">
            Total Price:
            <span>${props.order.totalPrice}.00</span>
          </div>
        </div>
      </div>
      {
        <OrderDetails i={props.i} order={props.order} mobile={true} index={props.index} show={props.show} />
      }
    </div>
  );
}