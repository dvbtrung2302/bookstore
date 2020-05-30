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

import { AuthContext } from '../../contexts/AuthContext';

const SignIn = (props) => {
  const { changeForm, setModal } = props;
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errors, setError] = useState({
    email: '',
    password: '',
    err: ''
  })
  const { setAlertOpen, userLogin } = useContext(AuthContext);

  const validate = () => {
    let emailError = '';
    let passwordError = '';

    if (!user.email) {
      emailError = 'The email field is required.'
    }
    if (!user.password) {
      passwordError = 'The password field is required.'
    }

    if (emailError || passwordError) {
      setError({
        email: emailError,
        password: passwordError
      })
      return false;
    }
    return true;
  }

  const handleInput = (event) => {
    event.preventDefault();
    setUser({...user, [event.target.name]: event.target.value})
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      axios.post('https://dvbt-bookstore.herokuapp.com/user/signin', {
              email: user.email,
              password: user.password
            })
           .then(res => {
              localStorage.setItem('token', res.data.token);
              userLogin(res.data.token);
              setModal(true);
              setAlertOpen();
            })
           .catch(err => {
              setError({
                err: err.response.data
              });
           });
    }
  }

  return(
    <div className="AuthForm">
      <div className="header">
        <h1>Welcome Back</h1>
        <p>Login with your email & password</p>
      </div>
      {errors.err && <div style={{
          color:"rgb(97, 26, 21)",
          backgroundColor:"rgb(253, 236, 234)",
          textAlign:"center",
          padding:"15px",
          borderRadius:"4px"
        }}>{errors.err}</div>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">EMAIL</Label>
          <Input 
            id="email" 
            type="email" 
            name="email" 
            placeholder="Ex: demo@demo.com"
            onChange={handleInput}
            autoComplete="off"
          />
          {errors.email && <div className="validation">{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="password">PASSWORD</Label>
          <Input 
            id="password" 
            type="password" 
            name="password" 
            placeholder="Ex: demo123"
            onChange={handleInput}
            autoComplete="off"
          />
          {errors.password && <div className="validation">{errors.password}</div>}
        </FormGroup>
        <Button size="lg" block type="submit">Continue</Button>
      </Form>
      <div className="footer">
        Don't have an account?
        <span onClick={() => changeForm('signup')}>Sign Up</span>
      </div>
    </div>
  )
}

SignIn.propTypes = {
  changeForm: PropTypes.func,
  setModal: PropTypes.func
}

export default SignIn;