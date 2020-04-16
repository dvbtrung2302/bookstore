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
          <Col xl="3" lg="4">
            <Category />
          </Col>
          <Col xl="9" lg="8">
            <Products />
          </Col>
        </Row>
      </Container>
    </main>
  );
}