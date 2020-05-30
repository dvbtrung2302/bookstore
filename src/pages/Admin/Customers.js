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
import Loadingpage from '../../components/LoadingPage';

const Customers = () => {
  const { newUsers, filter, loading } = useContext(AdminContext);
  return(
    <div className="Customers admin-page">
      <Container>
        {
          loading ?
          <Loadingpage /> :
          <React.Fragment>
            <Row style={{padding: "0 15px"}}>
              <Col className="admin-col mb-4 pb-0">
                <TaskBar option="customers" />
              </Col>
            </Row>
            {
              (filter.nameKeyword && !newUsers.length) ? 
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
                        <th>Id</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Total Order</th>
                        <th>Total Amount</th>
                        <th>Address</th>
                      </tr>
                    </thead>
    
                    <tbody>
                      {
                        newUsers.map((user, index) => 
                          <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.totalOrder}</td>
                            <td>${user.totalAmount}</td>
                            <td>{`${user.address}, ${user.district}, ${user.city}`}</td>
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

export default Customers;