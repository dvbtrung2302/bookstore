import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

import '../../css/Client/Product.css';
import CartBtn from './CartBtn';
import { AdminContext } from '../../contexts/AdminContext';

const Product = (props) => {
  const { item, type } = props;
  const { setOpen, setProduct } = useContext(AdminContext);

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

  const handleClick = () => {
    setOpen(true);
    setProduct(item);
  }

  return(
    <Col xl="3" lg="4" md="6" sm="6" className="mb-5">
      <Link
        onClick={type === 'admin' ? handleClick : null}
        to={
          type === 'admin' ? '/admin/products' :
          `/product/${toSlug(item.title)}`
            
        } 
        className={type === 'related' || type === 'admin' ? 'product fade-in w-custom' : 'product fade-in'}

      >
        <img src={item.image} alt="" />
        <div className={type === 'related' || type === 'admin' ? "info text-left" : "info"}>
          <h3 className="title">{item.title}</h3>
          <p className="author">By {item.author}</p>
        </div>
        { 
          (type === 'related' || type === 'admin') && 
          <div className="cart">
            <div className="price">${item.price}</div>
            {
              type !== 'admin' &&
              <CartBtn type={type} product={item} />
            }
          </div>
        }
      </Link> 
    </Col>
  );
}

Product.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number
  }),
  type: PropTypes.string
}

export default Product;