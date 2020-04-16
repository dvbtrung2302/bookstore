import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';

import SignIn from './SignIn';
import SignUp from './SignUp';
import '../css/AuthForm.css';

export default function() {
  const [modal, setModal] = useState(false);
  const [form, changeForm] = useState('signin');
  const toggle = () => setModal(!modal);

  const externalCloseBtn = <button className="auth close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
  return (
    <div>
      <Button className="auth-btn" onClick={() => {toggle(); changeForm('signin')}}>Sign In</Button>
      <Modal isOpen={modal} toggle={toggle} centered external={externalCloseBtn}>
        { form === 'signin' ?
           <SignIn changeForm={changeForm} setModal={setModal} /> : 
           <SignUp changeForm={changeForm} /> 
        }
      </Modal>
    </div>
  );
}