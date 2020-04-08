import React, { useContext }from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import './css/NotFound.css';
import {ProductsContext} from '../contexts/ProductsContext';

export default function() {
  const { setStateDefault } = useContext(ProductsContext);
  return(
    <div className="NotFound">
      <h1>Sorry, No result found :(</h1>
      <img src="https://res.cloudinary.com/dofqucuyy/image/upload/v1586332632/Books/notfound_sufieg.svg" alt="" />
      <button onClick={() => setStateDefault()} className="btn">
        <FontAwesomeIcon icon={faChevronLeft} />
        Go Back
      </button>
    </div>
  );
}