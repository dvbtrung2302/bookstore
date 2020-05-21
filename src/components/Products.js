import React, { useContext, useState, useEffect } from 'react';
import { 
  Container,
  Row,
  Spinner
} from 'reactstrap';

import '../css/Products.css';
import { ProductsContext } from '../contexts/ProductsContext';
import NotFound from './NotFound';
import ProductsLoading from './ProductsLoading';
import Product from './Product';

export default function(props) {
  const { products, keyword} = useContext(ProductsContext);
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
      <Container className="h-100">
        {
          (items === undefined || items.length === 0) ?
          [keyword ? <NotFound /> : <ProductsLoading key={items.length} /> ] :
          <Row>
            {
              items.slice(0, visible).map(item => <Product key={item._id} item={item} />)
            }
          </Row>
        }
        <Row className="m-0 w-100 d-flex justify-content-center">
          {
            (visible < items.length && !isLoading) &&
          <button onClick={loadMore} type="button" className="load-more mb-3">
            Load more
          </button>
          }
          { isLoading && <Spinner style={{color:"rgb(0, 158, 127)"}} /> }
        </Row>
      </Container>
    </div>
  );
}