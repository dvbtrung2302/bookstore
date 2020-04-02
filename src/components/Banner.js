import React from 'react';

import './css/Banner.css';
import SearchBar from './SearchBar';
import { Container } from 'reactstrap';

export default function() {
  return(
    <div className="Banner">
      <Container>
        <div className="title">
          <h1>Your own books store</h1>
          <p>Get your favourite books from our wide range of books.</p>
        </div>
        <SearchBar />
      </Container>
    </div>
  );
}