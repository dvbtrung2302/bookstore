import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSignOutAlt,
  faThLarge,
  faShoppingBasket,
  faCalendarCheck,
  faUsers
 } from "@fortawesome/free-solid-svg-icons";

import '../../css/Admin/NavBar.css';
import Burger from '../Burger';
import { AdminContext } from '../../contexts/AdminContext';

const LinkItem = (props) => {
  const {
    path,
    itemPath,
    icon,
    text
  } = props;
  return(
    <li>
      <Link 
        className={path === itemPath ? "link-active" : ""}
        to={itemPath || "/"}
      >
        <FontAwesomeIcon icon={icon} />
        {text}
      </Link>
    </li>
  );
}

const NavBar = (props) => {
  const [isClick, setClick] = useState(false);
  const { setOpen } = useContext(AdminContext);

  const handleBurgerClick = () => {
    setClick(!isClick);
  }

  const nav = [
    {icon: faThLarge, text: 'Dashboard', path: '/admin'},
    {icon: faShoppingBasket, text: 'Products', path: '/admin/products'},
    {icon: faCalendarCheck, text: 'Orders', path: '/admin/orders'},
    {icon: faUsers, text: 'Customers', path: '/admin/customers'},
    {icon: faSignOutAlt, text: 'Logout'}
  ];
  
    
  return(
    <header className="NavBar">
      <div className="wrapper">
        <Burger handleBurgerClick={handleBurgerClick} isClick={isClick} isNav={true} />
        <div className="logo">
          <Link to="/admin">
            <img src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" alt="" />
          </Link>
        </div>
        <div className="add-products-btn" onClick={() => setOpen(true, "add")}>
          Add Products
        </div>
      </div>
      <ul className={isClick ? "navs nav-active" : "navs"}>
        {
          nav.map(item => 
            <LinkItem 
              key={item.text}
              icon={item.icon} 
              text={item.text} 
              path={props.location.pathname} 
              itemPath={item.path} />
          )
        }
      </ul>
    </header>
  );
}

LinkItem.propTypes = {
  path: PropTypes.string,
  itemPath: PropTypes.string,
  icon: PropTypes.object,
  text: PropTypes.string
}

export default NavBar;