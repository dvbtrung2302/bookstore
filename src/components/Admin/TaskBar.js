import React, { useState, useContext } from 'react';
import { 
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import '../../css/Admin/TaskBar.css';
import { AdminContext } from '../../contexts/AdminContext';

const TaskBar = (props) => {
  const [ categoryClick, setCategoryClick ] = useState(false);
  const [ priceClick, setPriceClick ]  = useState(false);

  const { onFilter, filter } = useContext(AdminContext);

  const categoryList = [
    { name: 'Children Literature' },
    { name: 'Comic Book' },
    { name: 'Fantasy' },
    { name: 'Horror' },
    { name: 'Novel' },
    { name: 'Romantic' },
    { name: 'Science Fiction' },
    { name: 'Thriller' }
  ];

  const priceList = [
    { name: 'Highest to Lowest' },
    { name: 'Lowest to Highest'}
  ] 
  return(
    <Row className="TaskBar">
      <Col xl="2" className="mb-4 mb-xl-0">
        <h3 className="title">Products</h3>
      </Col>
      <Filter 
        setClick={setCategoryClick} 
        isClick={categoryClick} 
        name={filter.category} 
        list={categoryList} 
        onFilter={onFilter}
        filter={filter}
        type="category"
      />
      <Filter 
        setClick={setPriceClick} 
        isClick={priceClick} 
        name={filter.price} 
        list={priceList} 
        onFilter={onFilter}
        filter={filter}
      />
      <Search onFilter={onFilter} filter={filter} />
    </Row>
  );
}

const Filter = (props) => {
  const { 
    name, 
    list, 
    setClick, 
    isClick, 
    onFilter,
    filter,
    type
  } = props;

  const handleClick = (item) => {
    return (event) => {
      if (type === 'category') {
        onFilter(item.name, filter.price, filter.keyword);
      } else {
        onFilter(filter.category, item.name, filter.keyword);
      }
    }
  }

  const handleClear = (event) => {
    event.stopPropagation();
    if (type === 'category') {
      onFilter('Category Type', filter.price, filter.keyword);
    } else {
      onFilter(filter.category, 'Price', filter.keyword);
    }
  }

  return(
    <Col xl="3" className="Filter mb-3 mb-xl-0">
      <div 
        tabIndex="0"
        className="name" 
        onClick={() => setClick(!isClick)}
        onBlur={() => setClick(false)}
        >
        <div>{name}</div>
        {
          (name !== 'Category Type' && name !== 'Price') && 
          <FontAwesomeIcon icon={faTimesCircle} onClick={handleClear} />
        }
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <div className={ isClick ? "list list-active" : "list"}>
        {
          list.map(item => 
            <div 
            className="list-item" 
            key={item.name} 
            onMouseDown={handleClick(item)}
          >
            {item.name}
          </div>)
        }
      </div>
    </Col>
  );
}

const Search = (props) => {
  const { filter, onFilter } = props;

  const handleInput = (event) => {
    onFilter(filter.category, filter.price, event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return(
    <Col xl="4" className="Search">
      <Form className="h-100" onSubmit={handleSubmit}>
        <FormGroup>
          <Input 
            value={filter.keyword}
            onChange={handleInput}
            placeholder="Ex: Search By Name"
          />
          {
            filter.keyword && 
            <FontAwesomeIcon 
              icon={faTimesCircle} 
              style={{cursor:"pointer"}}
              onClick={() => onFilter(filter.category, filter.price, '')}  
            />
          }
        </FormGroup>
      </Form>
    </Col>
  );
}

export default TaskBar;