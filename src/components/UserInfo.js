import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { 
  Modal, 
  Form, 
  FormGroup, 
  Input, 
  Button 
} from 'reactstrap';

import '../css/UserInfo.css';

export default function(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const externalCloseBtn = <button className="auth close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

  return(
    <div className="UserInfo">
      <div className="info">{props.info}</div>
      <div className="edit-btn" onClick={toggle}>
        <FontAwesomeIcon icon={faPen} size="xs" />
        <Modal isOpen={modal} toggle={toggle} centered external={externalCloseBtn} autoFocus={false}>
          <div className="edit-modal">
            <h3 className="bt-header">{'Edit ' + (props.isPhone ? 'Contact' : 'Address')}</h3>
            <Form className="AuthForm p-0" onSubmit={props.handleSubmit}>
              <FormGroup>
                <Input 
                  type="text"
                  name={props.isPhone ? 'phone' : 'address'}
                  value={props.isPhone ? props.data.phone : props.data.address}
                  onChange={props.handleInput}
                  autoFocus
                  required
                />
                <Button block size="lg" type="submit">{'Save ' + (props.isPhone ? 'Contact' : 'Address')}</Button>
              </FormGroup>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}