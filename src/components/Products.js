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
import NotFound from './NotFound';

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
  const toSlug = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
 
    // return
    return str;
  }

  return(
      <div className="Products">
        <Container className="h-100">
          {
           (items === undefined || items.length === 0) ?
           <Row className="w-100 h-100 d-flex justify-content-center align-items-center">
             {keyword ? <NotFound /> : <Loading />}
           </Row> :
            <Row>
              {
                items.slice(0, visible).map(item => 
                  <Col key={item.title} xl="3" lg="4" md="6" sm="6" className="p-0 mb-5">
                    <Link to={{
                      pathname:'/product/' + toSlug(item.title),
                      state: {
                        id: item._id
                      }
                    }} 
                    className="product fade-in"
                  >
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
          }
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