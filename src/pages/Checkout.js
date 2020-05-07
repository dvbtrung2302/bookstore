import React, { useContext, useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { 
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

import '../css/Checkout.css';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { OrderContext } from '../contexts/OrderContext';
import { AreaContext } from '../contexts/AreaContext';  
import UserSideBar from '../components/UserSideBar';

export default function(props) {
  const { cartItems, totalPrice} = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { setStateDefault } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext)
  const { cities, handleCityClick} = useContext(AreaContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setError] = useState(null);
  const [ districts, setDistricts ] =  useState([]);
  const [order, setOrder] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    city: '',
    district: '',
    phone: '',
    payment: '',
    totalPrice: '',
    cartItems: []
  });

  useEffect(() => {
    document.title = 'Checkout - PickBazar';
    axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${user.city}`)
         .then(res => {
           setDistricts(res.data);
         })
         .then(() => {
           setOrder({
             id: user._id,
             name: user.name,
             email: user.email,
             address: user.address,
             city: user.city,
             district: user.district,
             phone: user.phone,
             totalPrice: totalPrice,
             payment: 'cash',
             cartItems: JSON.parse(localStorage.getItem('cartItems'))
           })
         })
    return () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${user.city}`, {
        cancelToken: source.token
      })
    }
  }, [user.name, user.email, user.address, user.phone, user._id, totalPrice, user.city, user.district])

  const handleInput = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
    setError(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cartItems.length === 0) {
      return;
    }
    if (order.payment === 'cash') {
      const { data } = await axios.post('http://localhost:5000/checkout', {
        order: order
      })
      if (data) {
        createOrder(data.order);
        localStorage.removeItem('cartItems');
        setStateDefault();
        props.history.push(`/order-received/${data.order._id}`);
      }
    } 
    if (order.payment === 'card') {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })
  
      if (!error) {
        const { id } = paymentMethod;
        const { data } = await axios.post('http://localhost:5000/checkout', {
          id: id, 
          amount: totalPrice * 100,
          order: order
        })
        if (data) {
          createOrder(data.order);
          localStorage.removeItem('cartItems');
          setStateDefault();
          props.history.push(`/order-received/${data.order._id}`);
        }
      } else {
        setError(error);
      }
    }
  }

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#ccc',
        fontWeight: 500,
        fontSize: '14px',
      },
    },
  };

  return(
    <div className="Checkout user-container">
      <div>
        <UserSideBar page="checkout" />
      </div>
      <div className="checkout-form">
        <div className="order-info">
          <h3 className="bt-header">Your order</h3>
          <div className="item">
            <div className="title">{`Sub Total(${cartItems.length}` + [cartItems.length === 1 ? 'item)': 'items)' ]}</div>
            <div className="price">{`$${totalPrice}.00`}</div>
          </div>
          <div className="item">
            <div className="title">Shipping Fee</div>
            <div className="price">$00</div>
          </div>
          <div className="item">
            <div className="title">Total</div>
            <div className="price">{`$${totalPrice}.00`}</div>
          </div>
          <div></div>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="billing-address">

            <h3 className="bt-header">Billing Address</h3>
            <FormGroup>
              <Label for="name">
                Name
              </Label>
              <Input 
                type="text" 
                value={order.name || ''} 
                name="name" 
                onChange={handleInput}
                required
                id="name"
                />
            </FormGroup>
            <FormGroup>
              <Label for="email">
                Email
              </Label>
              <Input 
                type="email" 
                value={order.email || ''} 
                name="email" 
                onChange={handleInput}
                required
                id="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">
                Address
              </Label>
              <Input 
                type="text" 
                value={order.address || ''} 
                name="address" 
                onChange={handleInput}
                required
                id="address"
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input 
                type="select" 
                name="city" 
                id="city" 
                onChange={(event) => {
                  handleInput(event);
                  handleCityClick(event); 
                }}
                value={order.city || ''}
              >
                <option>Tỉnh/Thành phố</option>
                { cities.map(city => <option key={city.code}>{city.name}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="district">District</Label>
              <Input 
                type="select" 
                name="district" 
                id="district" 
                onChange={handleInput}
                value={order.district || ''}
              >
                <option>Quận/Huyện</option>
                { districts.map(district => <option key={district.code}>{district.name}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="phone">
                Phone
              </Label>
              <Input 
                type="text" 
                value={order.phone || ''} 
                name="phone"
                onChange={handleInput}
                required
                id="phone"
              />
            </FormGroup>
          </div>
          <div className="payment">
            <h3 className="bt-header">Select Payment Option</h3>
            <FormGroup check className="d-flex justify-content-between mb-3 p-0">
              <Input 
                type="radio" 
                id="cash" 
                name="payment" 
                value="cash" 
                onChange={handleInput}
                checked={order.payment === 'cash'}
              />{' '}
              <Label for="cash" check>
                <FontAwesomeIcon icon={faMoneyBillAlt} />
                <span>Cash</span>
              </Label>
              <Input 
                type="radio" 
                id="card" 
                name="payment" 
                value="card" 
                onChange={handleInput}
              />{' '}
              <Label for="card" check>
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Card</span>
              </Label>
            </FormGroup>
          </div> 
          {order.payment === 'card' && <CardElement options={CARD_OPTIONS} onChange={e => setError(e.error)}/> }
          {cardError && <div className="error-msg">{cardError.message}</div>}
          <button 
            disabled={!stripe} 
            type="submit"
            className={cartItems.length === 0 ? 'disable-btn btn w-100' : 'btn w-100'} 
          >Proceed to Checkout</button>
        </Form>
      </div>
    </div>
  );
};
