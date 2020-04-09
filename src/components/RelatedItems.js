import React, { useContext } from 'react';
import {
 Container,
 Row
} from 'reactstrap';

import './css/RelatedItems.css';
import Product from './Product';
import { ProductsContext } from '../contexts/ProductsContext';

export default function() {
  const { products } = useContext(ProductsContext);
  const items = products.slice(0, 8); 
  return(
    <div className="RelatedItems">
      <Container>
        <Row className="ml-2">
          <h1>Related Items</h1>
        </Row>
        <Row>
          {
            items.map(product => <Product key={product._id} item={product} type='related' />)
          }
        </Row>
      </Container>
    </div>
  );
}