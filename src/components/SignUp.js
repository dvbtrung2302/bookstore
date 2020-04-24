import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Button, 
  Input,
  Label
} from 'reactstrap';

function validateFn(input = '', info = '') {
  if (!input) {
    return `The ${info} field is required.`
  }
  if (input.length < 6) {
    return `${info.charAt(0).toUpperCase() + info.slice(1)} must be at least 5 characters.`
  }
  return '';
}

export default function(props) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });
  const [errors, setError] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const validate = () => {
    const nameError = validateFn(user.name, 'name') || '';
    const emailError = validateFn(user.email, 'email') || '';
    const passwordError = validateFn(user.password, 'password') || '';
    const addressError = validateFn(user.address, 'address') || '';
    const phoneError = validateFn(user.phone, 'phone') || '';
    
    if (nameError || emailError || passwordError || addressError || phoneError) {
      setError({
        name: nameError,
        email: emailError,
        password: passwordError,
        address: addressError,
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
      axios.post('http://localhost:5000/user/signup', {
              name: user.name,
              email: user.email,
              password: user.password,
              address: user.address,
              phone: user.phone
            })
            .then(() => {
              props.changeForm('signin');
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
          <Input id="name" type="text" name="name" onChange={handleInput}/>
          {errors.name && <div className="validation">{errors.name}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="email">
            EMAIL
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="email" type="email" name="email" onChange={handleInput}/>
          {errors.email && <div className="validation">{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="password">
            PASSWORD
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="password" type="password" name="password" onChange={handleInput}/>
          {errors.password && <div className="validation">{errors.password}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="address">
            ADDRESS
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="address" type="text" name="address"  onChange={handleInput}/>
          {errors.address && <div className="validation">{errors.address}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="phone">
            PHONE
            <span className="ml-1 text-danger">*</span>
          </Label>
          <Input id="phone" type="text" name="phone" onChange={handleInput} />
          {errors.phone && <div className="validation">{errors.phone}</div>}
        </FormGroup>
        <Button size="lg" block type="submit">
          Continue
        </Button>
      </Form>
      <div className="footer">
        Already have an account?
        <span onClick={() => props.changeForm('signin')}>Sign In</span>
      </div>
    </div>
  )
}