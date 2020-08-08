import React, { useContext } from 'react';
import {
 Container,
 Row
} from 'reactstrap';

import '../../css/Client/RelatedItems.css';
import Product from './Product';
import { ProductsContext } from '../../contexts/ProductsContext';
import ProductsLoading from './ProductsLoading';

export default function() {
  const { relatedItems } = useContext(ProductsContext);
  
  const items = relatedItems.slice(0, 8); 
  return(
    <div className="RelatedItems">
      <Container>
        <Row className="ml-2">
          <h1>Related Items</h1>
        </Row>
        {
          !relatedItems.length ? <ProductsLoading /> :
          <Row>
            {
              items.map(product => <Product key={product._id} item={product} type='related' />)
            }
          </Row>
        }
      </Container>
    </div>
  );
}