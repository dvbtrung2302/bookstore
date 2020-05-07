import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from 'react-router-dom';

import '../css/User.css';
import { AuthContext } from '../contexts/AuthContext';

const User = (props)  => {
  const { setStateDefault } = useContext(AuthContext);
  const [active, setActive] = useState(false);

  const handleBtnClick = () => {
    setActive(!active)
  }
  
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setStateDefault();
    const path = props.location.pathname.slice(0, props.location.pathname.lastIndexOf('/'));
    if (path !== '/product') {
      props.history.push('/');
    }
  }

  return(
    <div className="User">
      <ul className={ active ? "nav-links nav-active" : "nav-links" } >
        <li className={ active ? "item-active" : "" }>
          <Link to="/profile">Profile</Link>
        </li>
        <li className={ active ? "item-active" : "" }>
          <Link to="/checkout">Checkout</Link>
        </li>
        <li className={ active ? "item-active" : "" }>
          <Link to="/order">My Orders</Link>
        </li>
        <li className={ active ? "item-active" : "" }>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
      <div className="btn" onClick={handleBtnClick}>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
}

export default withRouter(User);