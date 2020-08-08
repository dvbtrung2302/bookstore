import React, { useState, useContext } from 'react';
import { Link  } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";

import '../../css/Client/Category.css';
import Burger from '../Burger';
import { ProductsContext } from '../../contexts/ProductsContext';

const Category = (props) => {
  const { setCategory, filters } = useContext(ProductsContext);
  const [ isClick, setClick ] = useState(false);
  const category = [
    'Children Literature',
    'Comic Book',
    'Fantasy',
    'Horror',
    'Novel',
    'Romantic',
    'Science Fiction',
    'Thriller'
  ]

  const handleCatClick = () => {
    setClick(!isClick);
  }
  
  return (
    <div className={isClick ? "Category category-active" : "Category"}>
      <div className="logo">
        <FontAwesomeIcon icon={faThLarge} className="mr-2" />
        Select your Category
      </div>
      <ul>
        { category.map(item => 
          <li key={item} className="my-3" onClick={() => setCategory(item)}>
            <Link 
              to="/"
              className={filters._category === item ? 'active' : null}
            >
              {item}
            </Link>
          </li>
        )}
      </ul>
      <Burger isClick={isClick} handleCatClick={handleCatClick} />
    </div>
  );
}

export default Category;