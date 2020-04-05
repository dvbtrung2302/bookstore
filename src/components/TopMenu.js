import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import './css/TopMenu.css';
import SearchBar from './SearchBar';

export default function() {
  const [isHide, setHide] = useState(false);
  const [isVisble, setVisible] = useState(true);

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
    <header className="TopMenu">
      <div className={!isHide ? "wrapper" : "wrapper hide"}>
        <Container className="justify-content-between">
          <div className="logo">
            <Link to="/"> 
              <img alt="" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" />
            </Link>
          </div>
          { !isVisble && <SearchBar isTopMenu={true}/> }
          <div className="user-btn">
            <button>Sign in</button>
          </div>
        </Container>
      </div>
    </header>
  );
}