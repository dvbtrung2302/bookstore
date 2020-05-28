import React, { useContext }from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import '../css/NotFound.css';
import {ProductsContext} from '../contexts/ProductsContext';

const NotFound = (props) => {
  const { setStateDefault } = useContext(ProductsContext);
  const { type } = props;
  return(
    <div className="NotFound">
      <div className="wrapper">
        <h1>Sorry, No result found :(</h1>
        <img className="w-100" src="https://res.cloudinary.com/dofqucuyy/image/upload/v1586332632/Books/notfound_sufieg.svg" alt="" />
        {
          type !== 'admin' &&
          <button onClick={() => setStateDefault()} className="btn">
            <FontAwesomeIcon icon={faChevronLeft} />
            Go Back
          </button>
        }
      </div>
    </div>
  );
}

NotFound.propTypes = {
  type: PropTypes.string
}

export default NotFound;