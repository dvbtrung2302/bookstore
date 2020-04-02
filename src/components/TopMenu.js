import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import './css/TopMenu.css';
import SearchBar from './SearchBar';
import LessSearchBar from './LessSearchBar';

export default function() {
  const TopSearchBar = LessSearchBar(SearchBar, true);
  return(
    <header className="TopMenu">
      <Container>
        <div className="logo">
          <Link to="/"> 
            <img alt="" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" />
          </Link>
        </div>
        <TopSearchBar />
        <div className="user-btn">
          <button>Sign in</button>
        </div>
      </Container>
    </header>
  );
}