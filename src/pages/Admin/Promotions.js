import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';
import axios from "axios";

import NotFound from '../../components/NotFound';
import Loadingpage from '../../components/LoadingPage';
import { AdminContext } from '../../contexts/AdminContext';

const Promotions = () => {
  const { loading, promotions, setPromotion, setOpen } = useContext(AdminContext);
  
  const handleClick = (item) => {
    setOpen(true, "promotions-update")
    setPromotion(item);
  }

  return(
    <div className="promotions admin-page">
      <Container>
        {
          loading ?
          <Loadingpage /> :
          <React.Fragment>
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
                        <th>Description</th>
                        <th>Code</th>
                        <th>Discount %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        promotions.map((item, index) => 
                          <tr key={item._id} onClick={() => handleClick(item)}>
                            <td>{index + 1}</td>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.code}</td>
                            <td>{item.value}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
          </React.Fragment>
        }
      </Container>
    </div>
  );
}

export default Promotions;