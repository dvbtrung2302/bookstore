import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link, NavLink as RRNavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import queryString from 'query-string';

import './css/Category.css';

const Category = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const category = [
    'Children Literature',
    'Comic Book',
    'Fantasy',
    'Horror',
    'Novel',
    'Romantic',
    'Science Fiction',
    'Thriller'
  ]

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

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="Category">
      <Navbar color="light" light expand="lg" >
        <NavbarBrand tag={Link} to="/">
          <FontAwesomeIcon icon={faThLarge} className="mr-2" />
          Select your Category
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {
              category.map(item => 
                <NavItem key={item}>
                  <NavLink
                    exact to={"/?category=" + toSlug(item)}
                    tag={RRNavLink} 
                    isActive={() => toSlug(item) === queryString.parse(location.search).category}
                  >{item}
                  </NavLink>
                </NavItem>
              )
            }
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default Category;