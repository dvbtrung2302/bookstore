import React, { useContext, useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { 
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

import '../../css/Client/Checkout.css';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import { OrderContext } from '../../contexts/OrderContext';
import { AreaContext } from '../../contexts/AreaContext';  
import UserSideBar from '../../components/Client/UserSideBar';
import LoadingPage from '../../components/LoadingPage';

export default function(props) {
  const { cartItems, totalPrice} = useContext(CartContext);
  const { user, loading } = useContext(AuthContext);
  const { setStateDefault } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext)
  const { cities, handleCityClick } = useContext(AreaContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setError] = useState(null);
  const [order, setOrder] = useState({});
  const [districts, setDistricts] = useState([]);
  const [discount, setDiscount] = useState("");
  const [discountStatus, setDisCountStatus] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    setPrice(totalPrice)
  }, [totalPrice])

  useEffect(() => {
    document.title = 'Checkout - PickBazar';
    
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (!order.city) {
      setOrder({
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        city: user.city,
        district: user.district,
        phone: user.phone,
        payment: 'cash',
        totalPrice: totalPrice,
        cartItems: JSON.parse(localStorage.getItem('cartItems'))
      })
    }


    const tempCity = order.city ? order.city : user.city;
    
    axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${tempCity}`, { cancelToken: source.token })
          .then(res => {
            setDistricts(res.data);
          })
          .catch(err => {
            console.log(err);
    })

    return () => {
      source.cancel();
    }
  }, [user.city, order.city, totalPrice, user._id, user.address, user.district, user.email, user.name, user.phone])

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
      const { data } = await axios.post('https://dvbt-bookstore.herokuapp.com/checkout', {
        order: {
          ...order,
          totalPrice: price ? price : totalPrice
        }
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
        const { data } = await axios.post('https://dvbt-bookstore.herokuapp.com/checkout', {
          id: id, 
          amount: price ? price * 100 : totalPrice * 100,
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

  const handleDiscountInput = (e) => {
    setDiscount(e.target.value)
  }

  const handleDiscountSubmit = async () => {
    const value = discount.trim();
    if (!value) return;
    try {
      const data = {
        code: value,
        price: totalPrice
      }
      const res = await axios.post('https://dvbt-bookstore.herokuapp.com/promotion/apply-promotion', data);
      setDisCountStatus(res.data);
      setDiscount("");
      if (res.data.status === 1) {
        setPrice(res.data.priceAfterPromotion);
      } else {
        setPrice(null)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleKeyDown = (e) => {
    if (e.target.keyCode === 13) {
      handleDiscountSubmit()
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
      {
        loading ?
        <LoadingPage /> :
        <div className="checkout-form">
          <div className="order-info">
            <h3 className="bt-header">Your order</h3>
            <div className="item">
              <div className="title">{`Sub Total(${cartItems.length}` + [cartItems.length === 1 ? 'item)': 'items)' ]}</div>
              <div className="price">{`$${price ? price : totalPrice}.00`}</div>
            </div>
            <div className="item">
              <div className="title">Shipping Fee</div>
              <div className="price">$00</div>
            </div>
            <div className="item">
              <div className="title">Total</div>
              <div className="price">{`$${price ? price : totalPrice}.00`}</div>
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
                  value={order.name || user.name || ''} 
                  name="name" 
                  onChange={handleInput}
                  required
                  id="name"
                  autoComplete="off"
                  />
              </FormGroup>
              <FormGroup>
                <Label for="email">
                  Email
                </Label>
                <Input 
                  type="email" 
                  value={order.email || user.email || ''} 
                  name="email" 
                  onChange={handleInput}
                  required
                  id="email"
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">
                  Address
                </Label>
                <Input 
                  type="text" 
                  value={order.address || user.address || ''} 
                  name="address" 
                  onChange={handleInput}
                  required
                  id="address"
                  autoComplete="off"
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
                  value={order.city || user.city}
                  autoComplete="off"
                >
                  <option>Tỉnh/Thành phố</option>
                  { cities.map(city => <option key={city.name} >{city.name}</option>)}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="district">District</Label>
                <Input 
                  type="select" 
                  name="district" 
                  id="district" 
                  onChange={handleInput}
                  value={order.district || user.district}
                  autoComplete="off"
                >
                  <option>Quận/Huyện</option>
                  { districts.map(district => <option key={district.name}>{district.name}</option>)}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="phone">
                  Phone
                </Label>
                <Input 
                  type="text" 
                  value={order.phone || user.phone || ''} 
                  name="phone"
                  onChange={handleInput}
                  required
                  id="phone"
                  autoComplete="off"
                />
              </FormGroup>
            </div>
            <div className="discount">
              <h3 className="bt-header">Mã giảm giá</h3>
              <FormGroup>
                <Input 
                  type="discount" 
                  value={discount || ""} 
                  name="discount" 
                  onChange={handleDiscountInput}
                  onKeyDown={handleKeyDown}
                  id="discount"
                  autoComplete="off"
                  />
                <button type='button' onClick={handleDiscountSubmit}>Apply</button>
              </FormGroup>
              {
                discountStatus &&
                <Alert color={discountStatus.status === 0 ? "danger" : "success"}>{discountStatus.msg}</Alert>
              }
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
                  autoComplete="off"
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
                  autoComplete="off"
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
      }
    </div>
  );
};
