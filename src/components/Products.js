import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container,
  Row,
  Col 
} from 'reactstrap';

import './css/Products.css';
import ProductsContext from '../contexts/ProductsContext';

export default function(props) {
  return(
    <ProductsContext.Consumer>
      {({products}) => 
        <div className="Products">
          <Container>
            <Row>
              {
                products.map(product => 
                <Col lg="3" className="p-0 mb-5">
                  <Link to='/' className="product">
                    <img src={product.image} alt="" />
                    <div className="info">
                      <h3 className="title">{product.title}</h3>
                      <p className="author">By {product.author}</p>
                    </div>
                  </Link> 
                </Col>
                )
              }
            </Row>
          </Container>
        </div>
      }
    </ProductsContext.Consumer>
  );
}