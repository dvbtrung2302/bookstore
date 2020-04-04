import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

import Catogory from './Category';
import Products from './Products';
import './css/Main.css';

export default function (props) {
  return(
    <main className="Main">
      <Container>
        <Row>
          <Col lg="2">
            <Catogory />
          </Col>
          <Col lg="10">
            <Products />
          </Col>
        </Row>
      </Container>
    </main>
  );
}