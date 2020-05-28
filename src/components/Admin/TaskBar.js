import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
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
  const { option } = props;
  const [ categoryClick, setCategoryClick ] = useState(false);
  const [ priceClick, setPriceClick ]  = useState(false);
  const [ paymentClick, setPaymentClick ] = useState(false);
  const [ amountClick, setAmoutClick ] = useState(false);

  const { onFilter, filter, onOrdersFilter } = useContext(AdminContext);

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
  ];

  const paymentList = [
    { name: 'Cash On Delivery'},
    { name: 'Online Payment	'}
  ];

  const render = (option) => {
    switch(option) {
      case 'orders': 
        return (
          <React.Fragment>
            <Col xl="2" className="mb-4 mb-xl-0">
              <h3 className="title">Orders</h3>
            </Col>
            <Filter 
              setClick={setPaymentClick} 
              isClick={paymentClick}
              name={filter.payment} 
              list={paymentList} 
              onFilter={onOrdersFilter}
              filter={filter}
              type="payment"
            />

            <Filter 
              setClick={setAmoutClick} 
              isClick={amountClick}
              name={filter.amount} 
              list={priceList} 
              onFilter={onOrdersFilter}
              filter={filter}
              type="amount"
            />

            <Search onFilter={onOrdersFilter} filter={filter} option="orders" />
          </React.Fragment>
        )
      case 'customers':
        return <h3 className="title">Customers</h3>
      default:
        return (
          <React.Fragment>
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
              type="price"
            />
            <Search onFilter={onFilter} filter={filter} />
          </React.Fragment>
        )
    }
  }

  return(
    <Row className="TaskBar">
      {render(option)}
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
      switch(type) {
        case 'category':
          return onFilter(item.name, filter.price, filter.keyword);
        case 'payment':
          return onFilter(item.name, filter.amount, filter.addressKeyword);
        case 'amount':
          return onFilter(filter.payment, item.name, filter.addressKeyword);
        default:
          return onFilter(filter.category, item.name, filter.keyword);
      }
    }
  }

  const handleClear = (event) => {
    event.stopPropagation();
    switch(type) {
      case 'category':
        return onFilter('Category Type', filter.price, filter.keyword);
      case 'payment':
        return onFilter('Payment Method', filter.amount, filter.addressKeyword);
      case 'amount':
        return onFilter(filter.payment, 'Amount', filter.addressKeyword);
      default:
        return onFilter(filter.category, 'Price', filter.keyword);
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
          (name !== 'Category Type' && name !== 'Price' && name !== 'Payment Method' && name !== 'Amount') && 
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
  const { filter, onFilter, option } = props;

  const handleInput = (event) => {
    switch(option) {
      case 'orders':
        return onFilter(filter.payment, filter.amount, event.target.value);
      default:
        return onFilter(filter.category, filter.price, event.target.value);
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const render = (option) => {
    switch(option) {
      case 'orders':
        return (
          <Form className="h-100" onSubmit={handleSubmit}>
            <FormGroup>
              <Input 
                value={filter.addressKeyword}
                onChange={handleInput}
                placeholder="Ex: Search By Address"
              />
              {
                filter.addressKeyword && 
                <FontAwesomeIcon 
                  icon={faTimesCircle} 
                  style={{cursor:"pointer"}}
                  onClick={() => onFilter(filter.payment, filter.amount, '')}  
                />
              }
            </FormGroup>
          </Form>
        );
      default:
        return (
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
        );
    }
  }

  return(
    <Col xl="4" className="Search">
      {render(option)}
    </Col>
  );
}

TaskBar.propTypes = {
  option: PropTypes.string
}

Filter.propTypes = {
  name: PropTypes.string,
  list: PropTypes.array,
  setClick: PropTypes.func,
  isClick: PropTypes.bool,
  onFilter: PropTypes.func,
  filter: PropTypes.shape({
    category: PropTypes.string,
    price: PropTypes.string,
    payment: PropTypes.string,
    amount: PropTypes.string,
    keyword: PropTypes.string,
    addressKeyword: PropTypes.string
  }),
  type: PropTypes.string
}

Search.propTypes = {
  filter: PropTypes.shape({
    category: PropTypes.string,
    price: PropTypes.string,
    payment: PropTypes.string,
    amount: PropTypes.string,
    keyword: PropTypes.string,
    addressKeyword: PropTypes.string
  }),
  onFilter: PropTypes.func,
  option: PropTypes.string
}

export default TaskBar;