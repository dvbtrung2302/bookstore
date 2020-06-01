import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';

import '../../css/Admin/AdminLogin.css';
import { AdminContext } from '../../contexts/AdminContext';

const AdminLogin = (props) => {
  const [admin, setAdmin] = useState({});
  const [err, setErr] = useState('');
  const { adminToken, adminLogin } = useContext(AdminContext);

  const handleInput = (event) => {
    setAdmin({ ...admin, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    document.title = 'PickBazar';
    if (adminToken) {
      props.history.push("/admin");
    } else {
      return;
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://dvbt-bookstore.herokuapp.com/admin/login', {
      username: admin.username,
      password: admin.password
    })
        .then(res => {
          localStorage.setItem('adminToken', res.data.token);
          adminLogin(res.data.token);
        })
        .catch(err => {
          setErr(err.response.data);
        })
  }

  return(
    <div className="AdminLogin">
      <div className="AuthForm">
        <div className="header">
          <img src="https://res.cloudinary.com/dofqucuyy/image/upload/v1585755124/Books/logo_gtuxyy.svg" alt="" />
          <p>Login To Admin</p>
        </div>
        {err && <div style={{
          color:"rgb(97, 26, 21)",
          backgroundColor:"rgb(253, 236, 234)",
          textAlign:"center",
          padding:"15px",
          borderRadius:"4px"
        }}>{err}</div>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input 
              id="username" 
              type="text" 
              name="username" 
              placeholder="Ex: demo"
              required
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              name="password" 
              placeholder="Ex: demo"
              required
              onChange={handleInput}
            />
          </FormGroup>
          <Button size="lg" block type="submit">Continue</Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;