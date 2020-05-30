import React, { useState, useContext } from 'react';
import { Button, Modal } from 'reactstrap';

import '../../css/Client/AuthForm.css';
import { AuthContext } from '../../contexts/AuthContext';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function() {
  const [modal, setModal] = useState(false);
  const [form, changeForm] = useState('signin');
  const { isCheckoutClick, setCheckoutClick } = useContext(AuthContext)

  const toggle = () => {
    setModal(!modal);
    setCheckoutClick(!isCheckoutClick);
  }
  const externalCloseBtn = <button className="auth close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
  return (
    <div>
      <Button className="auth-btn" onClick={() => {toggle(); changeForm('signin')}}>Sign In</Button>
      <Modal isOpen={isCheckoutClick} toggle={toggle} centered external={externalCloseBtn}>
        { form === 'signin' ?
          <SignIn changeForm={changeForm} setModal={setModal} /> : 
          <SignUp changeForm={changeForm} /> 
        }
      </Modal>
    </div>
  );
}
