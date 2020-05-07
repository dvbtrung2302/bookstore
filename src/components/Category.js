import React, { useState, useContext } from 'react';
import { Link  } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";

import '../css/Category.css';
import { ProductsContext } from '../contexts/ProductsContext';

const Category = (props) => {
  const { setCategory, categoryName } = useContext(ProductsContext);
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
              className={categoryName === item ? 'active' : null}
            >
              {item}
            </Link>
          </li>
        )}
      </ul>
      <div className={isClick ? "burger toggle" : "burger"} onClick={handleCatClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {/* <Navbar color="light" light expand="lg" >
        <NavbarBrand>
          <FontAwesomeIcon icon={faThLarge} className="mr-2" />
          Select your Category
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {
              category.map(item => 
                <NavItem key={item}>
                  <NavLink
                    to="/"
                    tag={Link} 
                    className={categoryName === item ? 'active' : null}
                    onClick={() => setCategory(item)}
                  >{item}
                  </NavLink>
                </NavItem>
              )
            }
          </Nav>

        </Collapse>
      </Navbar> */}
    </div>
  );
}

export default Category;