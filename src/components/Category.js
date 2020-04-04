import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";

import './css/Category.css';

const Category = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="Category">
      <Navbar color="light" light expand="lg" >
        <NavbarBrand tag={Link} to="/">
          <FontAwesomeIcon icon={faThLarge} className="mr-2" />
          Select your Category
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {
              category.map(item => 
                <NavItem>
                  <NavLink tag={Link} to="/">{item}</NavLink>
                </NavItem>
              )
            }
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default Category;