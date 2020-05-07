import React from 'react';
import { Progress, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
  const className = 
  (props.mobile ? "order-detail d-flex d-xl-none" : "order-detail d-none d-xl-flex") 
  + (props.index === props.i && props.show ? " detail-active" : "");

  return(
    <div className={className} style={props.mobile ? {maxHeight:"0", overflow:"hidden", padding:"0"} : null}>
      <h3 className="bt-header">Order Details</h3>
      <div className="details">
        <div className="address">
          <div className="title">Delivery Address</div>
          <span>{props.order && `${props.order.address}, ${props.order.district}, ${props.order.city}` }</span>
        </div>
        <div className="info">
          <div>
            Sub Total
            <span>${props.order && props.order.totalPrice }.00</span>
          </div>
          <div>
            Discount
            <span>$0</span>
          </div>
          <div>
            Delivery Fee
            <span>$0</span>
          </div>
          <div>
            Total
            <span>${props.order && props.order.totalPrice }.00</span>
          </div>
        </div>
      </div>
      <div className="progress-wrapper">
        <Progress value="75">
          <div className="des">
            <div className="check-btn">
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="text">Order Received</div>
          </div>
          <div className="des">
            <div className="check-btn">
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="text">Order On The Way</div>
          </div>
          <div className="des">
            <div className="check-btn not-completed">
              {/* <FontAwesomeIcon icon={faCheck} /> */}
              3
            </div>
            <div className="text">Order Delivered</div>
          </div>
        </Progress>
      </div>
      <div className="items">
        {
          !props.order ? <div>Loading...</div> :  
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              { 
                props.order.cart && 
                props.order.cart.map(item => 
                <tr key={item._id}>
                  <th scope="row">
                    <div className="img-wrapper">
                      <img src={item.image} alt="" />
                    </div>
                  </th>
                  <td>
                    <div className="title">{item.title}</div>
                    <div className="price">${item.price}.00</div>
                  </td>
                  <td>
                    {item.quantity}
                  </td>
                  <td>${parseInt(item.quantity) * item.price}.00</td>
                </tr>)
              }
            </tbody>
          </Table>
        }
      </div>
    </div>
  );
}