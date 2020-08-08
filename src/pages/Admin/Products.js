import React, { useState, useContext } from 'react';
import {
  Container,
  Col,
  Row,
  Spinner
} from 'reactstrap';

import { AdminContext } from '../../contexts/AdminContext';
import TaskBar from '../../components/Admin/TaskBar';
import Product from '../../components/Client/Product';
import ProductsLoading from '../../components/Client/ProductsLoading';
import NotFound  from '../../components/NotFound';

const Products = () => {
  const [ visible, setVisible ] = useState(10);
  const [ isLoading, setLoading ] = useState(false);
  const { products, filter } = useContext(AdminContext);

  const loadMore = () => {
    setLoading(true);
    return setTimeout(() => {
      setVisible(visible + 8)
      setLoading(false);
    }, 1000);
  }
  return(
    <div className="AdminProducts admin-page">
      <Container>
        <Row style={{padding: "0 15px"}}>
          <Col className="admin-col mb-4 pb-0">
            <TaskBar />
          </Col>
        </Row>
        {
          (products === undefined || products.length === 0) ?
          (filter.keyword ? <NotFound type="admin" /> : <ProductsLoading /> ) :
          <Row>
            {
              products.slice(0, visible).map(product => <Product key={product._id} item={product} type="admin" />)
            }
          </Row>
        }
        <Row className="m-0 w-100 d-flex justify-content-center">
          {
            (visible < products.length && !isLoading) &&
          <button onClick={loadMore} type="button" className="load-more mb-3">
            Load more
          </button>
          }
          { isLoading && <Spinner style={{color:"rgb(0, 158, 127)"}} className="mb-3" /> }
        </Row>
      </Container>  
    </div>
  );
}

export default Products;