import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Button, 
  Input,
  Label
} from 'reactstrap';

import { AreaContext } from '../../contexts/AreaContext';

function validateFn(input = '', info = '') {
  if (!input) {
    return `The ${info} field is required.`
  }
  if (input.length < 6) {
    return `${info.charAt(0).toUpperCase() + info.slice(1)} must be at least 5 characters.`
  }
  return '';
}

const SignUp = (props) => {
  const { changeForm } = props;
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    district: '',
    address: '',
    phone: ''
  });
  const [errors, setError] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    district: '',
    phone: '',
  });
  const { cities, districts, handleCityClick } = useContext(AreaContext); 
  
  // useEffect(() => {
  //   axios.get('https://dvbt-areas.herokuapp.com/cities')
  //        .then(res => {
  //          setCity(res.data);
  //        })
  // })

  // const handleCity = (event) => {
  //   event.preventDefault();
  //   axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${event.target.value}`)
  //        .then(res => {
  //          setDistrict(res.data);
  //        })
  // }

  const validate = () => {
    const nameError = validateFn(user.name, 'name') || '';
    const emailError = validateFn(user.email, 'email') || '';
    const passwordError = validateFn(user.password, 'password') || '';
    const addressError = validateFn(user.address, 'address') || '';
    const phoneError = validateFn(user.phone, 'phone') || '';
    const cityError = validateFn(user.city, 'city') || '';
    const districtError = validateFn(user.district, 'district') || '';
    
    if (nameError || emailError || passwordError || addressError || phoneError) {
      setError({
        name: nameError,
        email: emailError,
        password: passwordError,
        address: addressError,
        city: cityError,
        district: districtError,
        phone: phoneError,
      })
      return false;
    }
    return true;
  }

  const handleInput = (event) => {
    event.preventDefault();
    setUser({...user, [event.target.name]: event.target.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      axios.post('https://dvbt-bookstore.herokuapp.com/user/signup', {
              name: user.name,
              email: user.email,
              password: user.password,
              address: user.address,
              city: user.city,
              district: user.district,
              phone: user.phone
            })
            .then(() => {
              changeForm('signin');
            })
            .catch(err => {
              setError({
                email: err.response.data
              })
            });
    }
  };
  return(
    <div className="AuthForm">
      <div className="header">
        <h1>Sign Up</h1>
        <p>By signing up, you agree to Pickbazar's</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">
            NAME
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="name" type="text" name="name" onChange={handleInput} autoComplete="off" />
          {errors.name && <div className="validation">{errors.name}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="email">
            EMAIL
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="email" type="email" name="email" onChange={handleInput} autoComplete="off"/>
          {errors.email && <div className="validation">{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="password">
            PASSWORD
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="password" type="password" name="password" onChange={handleInput} autoComplete="off"/>
          {errors.password && <div className="validation">{errors.password}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="address">
            ADDRESS
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="address" type="text" name="address"  onChange={handleInput} autoComplete="off"/>
          {errors.address && <div className="validation">{errors.address}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="city">
            City
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input autoComplete="off" type="select" name="city" id="city" onChange={(event) => {handleCityClick(event); handleInput(event)}}>
            <option>Tỉnh/Thành phố</option>
            { cities.map(city => <option key={city.code}>{city.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="district">
            District
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input autoComplete="off" type="select" name="district" id="district" onChange={handleInput}>
            <option>Quận/Huyện</option>
            { districts.map(district => <option key={district.code}>{district.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="phone">
            PHONE
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input autoComplete="off" id="phone" type="text" name="phone" onChange={handleInput} />
          {errors.phone && <div className="validation">{errors.phone}</div>}
        </FormGroup>
        <Button size="lg" block type="submit">
          Continue
        </Button>
      </Form>
      <div className="footer">
        Already have an account?
        <span onClick={() => changeForm('signin')}>Sign In</span>
      </div>
    </div>
  )
}

SignUp.propTypes = {
  changeForm: PropTypes.func
}

export default SignUp;