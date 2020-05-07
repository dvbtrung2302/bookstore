import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

import Category from './Category';
import Products from './Products';
import '../css/Main.css';

export default function (props) {
  return(
    <main className="Main">
      <Container fluid>
        <Row>
          <Col xl="2" lg="3">
            <Category />
          </Col>
          <Col xl="10" lg="9">
            <Products />
          </Col>
        </Row>
      </Container>
    </main>
  );
}