import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import '../../css/Client/TopMenu.css';
import SearchBar from './SearchBar';
import AuthForm from './AuthForm';
import User from './User';
import { ProductsContext } from '../../contexts/ProductsContext'
import { AuthContext } from '../../contexts/AuthContext';

const TopMenu = (props) => {
  const { isTopMenu } = props;
  const [isHide, setHide] = useState(false);
  const [isVisble, setVisible] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const { setStateDefault } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isTopMenu) {
      const hideMenu = () => {
        if (window.pageYOffset === 0 || window.pageYOffset > 500) {
          return setHide(false);
        } else {
          return setHide(true);
        }
      };
    
      const hideSearch = () => {
        if (window.pageYOffset > 500) {
          return setVisible(false); 
        } else {
          return setVisible(true);
        }
      }    
      window.addEventListener("scroll", hideMenu, true);
      window.addEventListener("scroll", hideSearch, true);
      return () => {
        window.removeEventListener("scroll", hideMenu, true);
        window.removeEventListener("scroll", hideSearch, true);
      };
    }
  }, [isTopMenu]);
  return(
    <header className="TopMenu TopMenuMobile">
       {
        isClicked ?
        <div className="search-bar">
          <div className={!isHide ? "wrapper" : "wrapper hide"}>
            <SearchBar 
              isTopMenuMobile={true} 
              setClicked={() => setClicked(false)}
            />
          </div>
        </div> :
        <div className={!isHide ? "wrapper" : "wrapper hide"}>
          <Container className="justify-content-between">
            { 
              isTopMenu &&
              <div className="mobile-btn d-flex d-xl-none">
                <FontAwesomeIcon 
                  icon={faSearch}
                  onClick={() => setClicked(true)}
                />
              </div>
            }
            <div className="logo">
              <Link to="/" onClick={() => setStateDefault()}> 
                <img alt="" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" />
              </Link>
            </div>
            {!isVisble && <SearchBar isTopMenu={true}/> }
            <div className="user-btn">
              {!user._id ? <AuthForm /> : <User {...props}/>}
            </div>
          </Container>
        </div>
      }
    </header>
  );
}

TopMenu.propTypes = {
  isTopMenu: PropTypes.bool
}

export default TopMenu;