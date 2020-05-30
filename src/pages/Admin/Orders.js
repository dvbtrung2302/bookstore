import React, { useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';

import { AdminContext } from '../../contexts/AdminContext';
import TaskBar from '../../components/Admin/TaskBar';
import NotFound from '../../components/NotFound';
import LoadingPage from '../../components/LoadingPage';

const AdminOrders = () => {
  const { filtedOrders, filter, loading } = useContext(AdminContext);
  return(
    <div className="AdminOrders admin-page">
      <Container>
        {
          loading ?
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
                      </tr>
                    </thead>
    
                    <tbody>
                      {
                        filtedOrders.map((order, index) => 
                          <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{order._id}</td>
                            <td>{order.date}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.payment === 'cash' ? 'Cash On Delivery' : 'Online Payment'}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{`${order.address}, ${order.district}, ${order.city}`}</td>
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