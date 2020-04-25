import React, { useContext, useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { 
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { OrderContext } from '../contexts/OrderContext';
import '../css/Checkout.css';

export default function(props) {
  const { cartItems, totalPrice} = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { setStateDefault } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext)
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setError] = useState(null);
  const [order, setOrder] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    payment: '',
    totalPrice: '',
    cartItems: []
  });

  useEffect(() => {
    setOrder({
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      totalPrice: totalPrice,
      payment: 'cash',
      cartItems: JSON.parse(localStorage.getItem('cartItems'))
    })
  }, [user.name, user.email, user.address, user.phone, user._id, totalPrice])

  const handleInput = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
    setError(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        fontSize: '1rem',
      },
    },
  };

  return(
    <div className="Checkout">
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
              <Label className="mb-3" for="cash" check>
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
          <Button disabled={!stripe} size="lg" block type="submit">Proceed to Checkout</Button>
        </Form>
      </div>
    </div>
  );
};
