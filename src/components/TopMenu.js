import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import './css/TopMenu.css';
import SearchBar from './SearchBar';

export default function() {
  const [isHide, setHide] = useState(true);

  const hideMenu = () => {
    console.log(window.pageYOffset);
    if (window.pageYOffset === 0 || window.pageYOffset > 500) {
      return setHide(true);
    } else {
      return setHide(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", e => {
      hideMenu();
    });
  });
  return(
    <header className="TopMenu">
      <div className={isHide ? "wrapper" : "wrapper hide"}>
        <Container>
          <div className="logo">
            <Link to="/"> 
              <img alt="" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" />
            </Link>
          </div>
          <SearchBar isTopMenu={true} />
          <div className="user-btn">
            <button>Sign in</button>
          </div>
        </Container>
      </div>
    </header>
  );
}