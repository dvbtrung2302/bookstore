import React, { useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Spinner
} from 'reactstrap';

import '../../css/Admin/Orders.css';
import { AdminContext } from '../../contexts/AdminContext';
import TaskBar from '../../components/Admin/TaskBar';
import NotFound from '../../components/NotFound';

const AdminOrders = () => {
  const { filtedOrders, filter } = useContext(AdminContext);
  return(
    <div className="AdminOrders admin-page">
      <Container>
        <Row style={{padding: "0 15px"}}>
          <Col className="admin-col mb-4 pb-0">
            <TaskBar option="orders" />
          </Col>
        </Row>
        {
          (filtedOrders === undefined || filtedOrders.length === 0) ?
          (filter.addressKeyword ? <NotFound type="admin" /> : <Spinner style={{color:"rgb(0, 158, 127)"}} className="mb-3" /> ) :
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
      </Container>
    </div>
  );
}

export default AdminOrders;