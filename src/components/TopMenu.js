import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import './css/TopMenu.css';
import SearchBar from './SearchBar';

export default function() {
  return(
    <header className="TopMenu">
      <div className="wrapper">
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