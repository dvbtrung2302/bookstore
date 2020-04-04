import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './css/TopMenu.css';
import SearchBar from './SearchBar';

export default function() {
  const [isClicked, setClicked] = useState(false);
  
  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  })

  return(
    <header className="TopMenu TopMenuMobile">
      {
        isClicked ?
        <div className="search-bar">
          <div className="wrapper">
            <SearchBar 
              isTopMenuMobile={true} 
              setClicked={() => setClicked(false)}
            />
          </div>
        </div> :
        <div className="wrapper">
          <Container>
            <div className="mobile-btn">
              <FontAwesomeIcon 
                icon={faSearch} 
                onClick={() => setClicked(true)}
              />
            </div>
            <div className="logo">
              <Link to="/"> 
                <img alt="" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" />
              </Link>
            </div>
            <div className="user-btn">
              <button>Sign in</button>
            </div>
          </Container>
        </div>
      }
    </header>
  );
}