import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { 
  Dropdown, 
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

import '../css/User.css';
import { AuthContext } from '../contexts/AuthContext';

const User = (props)  => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const toggle = () => setDropdownOpen(prevState => !prevState);
  return(
    <div className="User">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle>
          <FontAwesomeIcon icon={faUser} size="lg" />
        </DropdownToggle>
        <DropdownMenu right>
          <div className="menu-item">
            <Link to="/profile">Profile</Link>
          </div>
          <div className="menu-item">
            <Link to="/checkout">Checkout</Link>
          </div>
          <div className="menu-item">
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default withRouter(User);