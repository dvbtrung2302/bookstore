import React, { useContext, useState, useEffect } from 'react';
import { 
  Container, 
  Row,
  Col
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import '../css/ProductView.css';
import CartBtn from './CartBtn';
import { ProductsContext } from '../contexts/ProductsContext';
import ProductViewLoading from './ProductViewLoading';

function ProductView(props) {
  const [ product, setProduct ] = useState([]);
  const [ isShow, setShow ] = useState(false);
  const { setCategory } = useContext(ProductsContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    axios.get(`https://dvbt-bookstore.herokuapp.com/products/product/?id=${props.location.state.id}`)
          .then(res => {
            setProduct(res.data);
            document.title = `${res.data.title} - PickBazar`;
          })
          .catch(err => {
            console.log(err);
          });
    return () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
  
      axios.get(`https://dvbt-bookstore.herokuapp.com/products/product/?id=${props.location.state.id}`, {
        cancelToken: source.token
      })
    }
  }, [props.location.state.id]);

  return(
    <div className="ProductView py-5">
      <Container fluid="lg">
        {
          !product.title ? <ProductViewLoading /> : 
          <Row>
            <Col xl="6" lg="6" className="mb-5 text-center">
              <button 
                className="btn back-btn"
                onClick={() => props.history.goBack()}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                Back
              </button>
              <div className="img-wrapper">
                <img 
                  src={product.image}
                  alt="" 
                />
              </div>
            </Col>
            <Col xl="6" lg="6">
              <div className="title">
                <h1>{product.title}</h1>
                <p>By {product.author}</p>
              </div>
              <div className="des">
                <p className={isShow ? 'des-show' : ''}>
                  {product.description}
                </p>
                {
                  !isShow ? 
                  <div 
                    className="read-more"
                    onClick={() => setShow(!isShow)}
                  >
                    Read more
                  </div> :
                  <div 
                  className="read-more"
                  onClick={() => setShow(!isShow)}
                >
                  Less
                </div>
                }
              </div>
              <div className="price">${product.price}</div>
              <CartBtn product={product} />
              <div className="category">
                <Link onClick={() => setCategory(product.category)} to="/" className="btn">
                  {product.category}
                </Link>
              </div>
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
}

export default ProductView;