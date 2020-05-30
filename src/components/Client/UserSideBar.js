import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import '../../css/Client/UserSideBar.css';
import { AuthContext } from '../../contexts/AuthContext';

const UserSideBar =  (props) => {
  const { page } = props;
  const { setStateDefault } = useContext(AuthContext);

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
    <div className="UserSideBar d-none d-xl-block">
      <ul className="nav flex-column">
        <li className={page === 'order' ? "nav-item current-page" : "nav-item"}>
          <Link to="/order">Your Order</Link>
        </li>
        <li className={page === 'checkout' ? "nav-item current-page mb-5" : "nav-item mb-5"}>
          <Link to="/checkout">Checkout</Link>
        </li>
        <li className={page === 'profile' ? "nav-item current-page" : "nav-item"}>
          <Link to="/profile">Your Account Settings</Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </div>
  );
}

UserSideBar.propTypes = {
  page: PropTypes.string
}

export default withRouter(UserSideBar);