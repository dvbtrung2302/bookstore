import React, { useContext, useState, useEffect } from 'react';
import { 
  Container,
  Row, 
  Spinner
} from 'reactstrap';

import '../../css/Client/Products.css';
import { ProductsContext } from '../../contexts/ProductsContext';
import NotFound from '../NotFound';
import ProductsLoading from './ProductsLoading';
import Product from './Product';

export default function(props) {
  const { products, onLoadMoreBtnClick, filters, isLoading, isLoadMore } = useContext(ProductsContext);
  const {_limit, _keyword, _category } = filters;
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    setItems(products);
  }, [products])

  const handleLoadMore = () => {
    if (onLoadMoreBtnClick) {
      onLoadMoreBtnClick();
    }
  }

  return(
    <div className="Products">
      <Container className="h-100">
        {
          (_keyword) && 
          <Row style={{padding: "0 15px", marginBottom: "15px", fontWeight: "600"}}>
            {
              _category ? 
              <div>
                Results for 
                <p className="d-inline font-weight-bold" style={{color: "rgb(0, 158, 127)"}}> "{_keyword}" </p> 
                in 
                <p className="d-inline font-weight-bold" style={{color: "rgb(0, 158, 127)"}}> {_category}</p>. 
              </div> :
              <div>
                Results for 
                <p className="d-inline font-weight-bold" style={{color: "rgb(0, 158, 127)"}}> "{_keyword}"</p>.
              </div>
            }
          </Row>
        }
        {
          (isLoading || !items.length) ?
          (_keyword && !items.length ? <NotFound /> : <ProductsLoading /> ) :
          <Row>
            {
              items.map(item => <Product key={item._id} item={item} />)
            }
          </Row>
        }
        <Row className="m-0 w-100 d-flex justify-content-center">
          { isLoadMore && _limit !== 8 ? 
            <Spinner style={{color:"rgb(0, 158, 127)"}} className="mb-3" /> : 
            ((items.length >= _limit) && 
            <button onClick={() => handleLoadMore()} type="button" className="load-more mb-3">
              Load more
            </button>)
          }
        </Row>
      </Container>
    </div>
  );
}