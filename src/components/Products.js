import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container,
  Row,
  Col 
} from 'reactstrap';

import './css/Products.css';
import { ProductsContext } from '../contexts/ProductsContext';
import Loading from './Loading';

export default function(props) {
  const { products } = useContext(ProductsContext);
  const [ items, setItems ] = useState([]);
  const [ visible, setVisible ] = useState(10);
  const [ isLoading, setLoading ] = useState(false);

  useEffect(() => {
    setItems(products);
  }, [products])

  const loadMore = () => {
    setLoading(true);
    return setTimeout(() => {
      setVisible(visible + 8)
      setLoading(false);
    }, 1000);
  }

  return(
      <div className="Products">
        <Container>
          <Row>
            {
              items.slice(0, visible).map(item => 
                <Col key={item.title} xl="3" lg="4" md="6" sm="6" className="p-0 mb-5">
                  <Link to='/' className="product fade-in">
                    <img src={item.image} alt="" />
                    <div className="info">
                      <h3 className="title">{item.title}</h3>
                      <p className="author">By {item.author}</p>
                    </div>
                  </Link> 
                </Col>
              )
            }
          </Row>
          <Row className="m-0 w-100 d-flex justify-content-center">
            {
              (visible < items.length && !isLoading) &&
            <button onClick={loadMore} type="button" className="load-more">
              Load more
            </button>
            }
            { isLoading && <Loading /> }
          </Row>
        </Container>
      </div>
  );
}