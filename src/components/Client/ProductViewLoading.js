import React from 'react';
import  {
  Row,
  Col
} from 'reactstrap';

import '../../css/Client/ProductViewLoading.css';

export default function() {
  return(
    <Row className="ProductViewLoading">
       <Col lg="6" xl="6" className="mb-5">
         <div className="img-loading"></div>
       </Col>
       <Col lg="6" xl="6" className="content-loading">
         <div className="mb-1"></div>
         <div className="mb-5"></div>
         <div className="mb-4"></div>
         <div></div>
       </Col>
    </Row>
  )
}