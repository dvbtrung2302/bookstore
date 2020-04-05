import React, { lazy, Suspense } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

import Category from './Category';
import Loading from './Loading';
import './css/Main.css';

const Products = lazy(() => import('./Products'));

export default function (props) {
  return(
    <main className="Main">
      <Container fluid>
        <Row>
          <Col xl="3" lg="4">
            <Category />
          </Col>
            <Col xl="9" lg="8">
              <Suspense fallback={<Loading />} >
                <Products />
              </Suspense>
            </Col>
        </Row>
      </Container>
    </main>
  );
}