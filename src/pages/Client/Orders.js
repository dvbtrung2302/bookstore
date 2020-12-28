import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../css/Client/Orders.css';
import Order from '../../components/Client/Order';
import UserSideBar from '../../components/Client/UserSideBar';
import OrderDetails from '../../components/Client/OrderDetails';
import LoadingPage from '../../components/LoadingPage';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [i, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    document.title = 'Order - PickBazar';
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get('https://dvbt-bookstore.herokuapp.com/order', { headers: {"Authorization" : `Bearer ${token}`}}, { cancelToken: source.token })
         .then(res => {
           setOrders(res.data.reverse());
           setOrder(res.data[0]);
           setLoading(false);
         })
         .catch(err => {
           console.log(err);
         })
    return () => {
      source.cancel();
    }
  }, [token])

  const handleClick = (index, order) => {
    if (index === i) {
      return setShow(!show);
    }
    setShow(true);
    setIndex(index);
    setOrder(order);
  }
  return(
    <div className="Orders user-container">
      <div>
        <UserSideBar page="order" />
      </div>
      {
        loading ?
        <LoadingPage /> :
        <div className="order-container">
          <div className="my-order mx-4">
            <h3 className="bt-header">My Order</h3>
            { orders.length === 0 && <span style={{
                fontSize:"15px",
                fontWeight:"700",
                color:"rgb(119, 121, 140)",
                display:"block",
                width:"100%",
                textAlign:"center",
                padding:"40px 0px"
              }}>No Order found.</span>
            }
            { orders.map((order, index) => 
              <Order 
                order={order} 
                index={index} 
                key={order._id} 
                handleClick={handleClick} 
                i={i} 
                show={show}
              /> )}
          </div>
            <OrderDetails order={order} />
        </div>
      }
    </div>
  );
}

export default Orders;