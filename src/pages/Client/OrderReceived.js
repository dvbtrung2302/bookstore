import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../../css/Client/OrderReceived.css';
import BackToHomeBtn from '../../components/Client/BackToHomeBtn';
import LoadingPage from '../../components/LoadingPage';


const OrderReceived = (props) => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Invoice - PickBazar';
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get(`https://dvbt-bookstore.herokuapp.com/checkout/?id=${props.match.params.id}`, { cancelToken: source.token })
         .then(res => {
           setOrder(res.data);
           setLoading(false);
         })
         .catch(err => {
           console.log(err);
         })
    return () => {
      source.cancel();
    }
  }, [props.match.params.id])

  return(
    <div className="OrderReceived user-container">
      {
        loading ? 
        <LoadingPage /> :
        <div className="user-wrapper">
          <BackToHomeBtn />
          <div className="received mb-5">
            <h3 className="bt-header">Order Received</h3>
            <p className="mb-4">Thank you. Your order has been received</p>
            <div className="info">
              <div className="info-data">
                <div className="info-header">Order Id</div>
                <p>{order._id}</p>
              </div>
              <div className="info-data">
                <div className="info-header">Date</div>
                <p>{order.date}</p>
              </div>
              <div className="info-data">
                <div className="info-header">Total</div>
                <p>${order.totalPrice}.00</p>
              </div>
              <div className="info-data">
                <div className="info-header">Payment Method</div>
                <p>
                  {order.payment === 'cash' ? 'Cash On Delivery' : 'Online Payment'}
                </p>
              </div>
            </div>
          </div>
          <div className="detail mb-5">
            <h3 className="bt-header">Order Details</h3>
            <div className="detail-info">
              <div className="info-header m-0">Total Item</div>
              <p>{order.cart ? (order.cart.length < 2 ?  `${order.cart.length} Item` : `${order.cart.length} Items` ): 0}</p>
            </div>
            <div className="detail-info">
              <div className="info-header m-0">Order Time</div>
              <p>{order.orderTime}</p>
            </div>
            <div className="detail-info">
              <div className="info-header m-0">Delivery Location</div>
              <p>{`${order.address}, ${order.district}, ${order.city}`}</p>
            </div>
          </div>
          <div className="amount detail">
            <h3 className="bt-header">Total Amount</h3>
            <div className="detail-info">
              <div className="info-header m-0">Sub Total</div>
              <p>${order.totalPrice}.00</p>
            </div>
            <div className="detail-info">
              <div className="info-header m-0">Payment Method</div>
              <p>
                {order.payment === 'cash' ? 'Cash On Delivery' : 'Online Payment'}
              </p>
            </div>
            <div className="detail-info">
              <div className="info-header m-0">Total</div>
              <p>${order.totalPrice}.00</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default OrderReceived;

