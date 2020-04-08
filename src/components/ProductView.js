import React from 'react';
import { 
  Container, 
  Row,
  Col
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import './css/ProductView.css';
import CartBtn from './CartBtn';
import Loading from './Loading';
import { ProductsContext } from '../contexts/ProductsContext';

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isShow: false
    }

    this.setShow = this.setShow.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/products/product/?id=${this.props.location.state.id}`)
         .then(res => {
           this.setState({
             product: res.data
           })
         })
         .catch(err => {
           console.log(err);
         })
  }
  componentWillUnmount() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios.get(`http://localhost:5000/products/product/?id=${this.props.location.state.id}`, {
      cancelToken: source.token
    })
  }
  
  setShow() {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow
    })
  }
  
  
  render() {
    const { isShow, product } = this.state;
    return(
      <div className="ProductView py-5">
        <Container fluid="lg">
          {
            !product.title ? <Loading /> : 
            <Row>
              <Col xl="6" lg="6" className="mb-5 text-center">
                <button 
                  className="btn back-btn"
                  onClick={() => this.props.history.goBack()}
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
                      onClick={this.setShow}
                    >
                      Read more
                    </div> :
                    <div 
                    className="read-more"
                    onClick={this.setShow}
                  >
                    Less
                  </div>
                  }
                </div>
                <div className="price">${product.price}</div>
                <CartBtn />
                <div className="category">
                  <ProductsContext.Consumer>
                  {({ setCategory }) => (
                      <Link onClick={() => setCategory(product.category)} to="/" className="btn">
                        {product.category}
                      </Link>
                    )
                  }
                  </ProductsContext.Consumer>
                </div>
              </Col>
            </Row>
          }
        </Container>
      </div>
    );
  }
}

export default ProductView;