import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';
import '../../css/Admin/AdminOrder.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faShippingFast, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { AdminContext } from '../../contexts/AdminContext';
import TaskBar from '../../components/Admin/TaskBar';
import NotFound from '../../components/NotFound';
import LoadingPage from '../../components/LoadingPage';
import Spinner from 'reactstrap/lib/Spinner';

const AdminOrders = () => {
  const { filtedOrders, filter, loading } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');
  const getStatus = (status) => {
    switch (status) {
      case 1: return <FontAwesomeIcon size="2x" icon={faTimes} />
      case 2: return <FontAwesomeIcon size="2x" icon={faShippingFast} />
      default: return <FontAwesomeIcon size="2x" icon={faCheck} />
    }
  }

  useEffect(() => {
    setOrders(filtedOrders)
  }, [filtedOrders])

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://dvbt-bookstore.herokuapp.com/admin/admin-get', { headers: {"Authorization" : `Bearer ${token}`}})
      setOrders(res.data.orders.reverse())
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusClick = async (status, data) => {
    if (status === data.status) return;
    try {
      const postData = {
        ...data,
        status: status
      }
      const res = await axios.patch('https://dvbt-bookstore.herokuapp.com/order/update-status', postData, { headers: {"Authorization" : `Bearer ${token}`}});
      fetchOrders();
    } catch (error) {
      console.log(error);
    } 
  }

  return(
    <div className="AdminOrders admin-page">
      <Container>
        {
          isLoading || loading ?
          <LoadingPage /> :
          <React.Fragment>
            <Row style={{padding: "0 15px"}}>
              <Col className="admin-col mb-4 pb-0">
                <TaskBar option="orders" />
              </Col>
            </Row>
            {
              (filter.addressKeyword && !filtedOrders.length) ? 
              <NotFound type="admin" /> : 
              <Row style={{padding: "0 15px"}}>
                <Col 
                  className="admin-col p-0" 
                  style={{
                    overflow:"auto", 
                    maxHeight:"450px",
                  }}
                >
                  <Table className="admin-table">
                    <thead>
                      <tr>
                        <th>Number</th>
                        <th>Order Id</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Customer's Email</th>
                        <th>Contact</th>
                        <th>Delivery Address</th>
                        <th>Status</th>
                      </tr>
                    </thead>
    
                    <tbody>
                      {
                        orders.map((order, index) => 
                          <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{order._id}</td>
                            <td>{order.date}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.payment === 'cash' ? 'Cash On Delivery' : 'Online Payment'}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{`${order.address}, ${order.district}, ${order.city}`}</td>
                            <td className="status">
                              <div className="main">
                                {getStatus(order.status)}
                              </div>
                              <div className="list">
                                <div onClick={() => handleStatusClick(1, order)}>
                                  <FontAwesomeIcon size="2x" icon={faTimes}/>
                                </div>
                                <div onClick={() => handleStatusClick(2, order)}>
                                  <FontAwesomeIcon size="2x" icon={faShippingFast} />
                                </div>
                                <div onClick={() => handleStatusClick(3, order)}>
                                  <FontAwesomeIcon size="2x" icon={faCheck}/>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
            }
          </React.Fragment>
        }
      </Container>
    </div>
  );
}

export default AdminOrders;