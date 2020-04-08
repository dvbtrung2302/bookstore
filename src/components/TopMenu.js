import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './css/TopMenu.css';
import SearchBar from './SearchBar';
import {ProductsContext} from '../contexts/ProductsContext'

export default function() {
  const [isHide, setHide] = useState(false);
  const [isVisble, setVisible] = useState(true);
  const { setStateDefault } = useContext(ProductsContext);
  const [isClicked, setClicked] = useState(false);

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

  useEffect(() => {
    document.addEventListener("scroll", e => {
      hideMenu();
      hideSearch();
    });
  });
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
            <div className="mobile-btn d-block d-xl-none">
              <FontAwesomeIcon 
                icon={faSearch}
                onClick={() => setClicked(true)}
              />
            </div>
            <div className="logo">
              <Link to="/" onClick={() => setStateDefault()}> 
                <img alt="" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" />
              </Link>
            </div>
            {!isVisble && <SearchBar isTopMenu={true}/> }
            <div className="user-btn">
              <button>Sign in</button>
            </div>
          </Container>
        </div>
      }
    </header>
  );
}