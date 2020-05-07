import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { 
  Modal, 
  Form, 
  FormGroup, 
  Input, 
  Button, 
  Label
} from 'reactstrap';
import axios from 'axios';

import '../css/UserInfo.css';
import { AreaContext } from '../contexts/AreaContext';

export default function(props) {
  const [modal, setModal] = useState(false);
  const [ districts, setDistricts ] = useState([]);
  const { cities, handleCityClick } = useContext(AreaContext);
  const toggle = () => setModal(!modal);
  const externalCloseBtn = <button className="auth close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

  useEffect(() => {
    axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${props.data.city}`)
         .then(res => {
           setDistricts(res.data)
         })
    return () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
  
      axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${props.data.city}`, {
        cancelToken: source.token
      })
    }
  }, [props.data.city])

  return(
    <div className="UserInfo">
      <div className="info">{props.isPhone ? props.data.phone : `${props.data.address}, ${props.data.district}, ${props.data.city}`}</div>
      <div className="edit-btn" onClick={toggle}>
        <FontAwesomeIcon icon={faPen} size="xs" />
        <Modal isOpen={modal} toggle={toggle} centered external={externalCloseBtn} autoFocus={false}>
          <div className="edit-modal">
            <h3 className="bt-header">{'Edit ' + (props.isPhone ? 'Contact' : 'Address')}</h3>
            <Form className="AuthForm p-0" onSubmit={props.handleSubmit}>
              <FormGroup>
              {
                !props.isPhone &&
                <Label for="address">
                  ADDRESS
                  <span className="ml-1 text-danger">*</span>
                </Label>
              }
                <Input 
                  type="text"
                  name={props.isPhone ? 'phone' : 'address'}
                  value={props.isPhone ? props.data.phone : props.data.address}
                  onChange={props.handleInput}
                  autoFocus
                  required
                />
              </FormGroup>
              {
                !props.isPhone &&
                <FormGroup>
                  <Label for="city">
                    City
                    <span className="ml-1 text-danger">*</span>
                  </Label>
                  <Input 
                    type="select" 
                    name="city"
                    id="city" 
                    onChange={(event) => {
                      props.handleInput(event); 
                      handleCityClick(event)
                    }} 
                    defaultValue={props.data.city}
                  >
                    <option>Tỉnh/Thành phố</option>
                    { cities.map(city => <option key={city.code}>{city.name}</option>)}
                  </Input>
                </FormGroup>
              }
              {
                !props.isPhone &&
                <FormGroup>
                  <Label for="district">
                    District
                    <span className="ml-1 text-danger">*</span>
                  </Label>
                  <Input 
                    type="select" 
                    name="district" 
                    id="district" 
                    onChange={props.handleInput} 
                    defaultValue={props.data.district}
                  >
                    <option>Quận/Huyện</option>
                    { districts.map(district => <option key={district.code}>{district.name}</option>)}
                  </Input>
                </FormGroup>
              }
              <Button block size="lg" type="submit">{'Save ' + (props.isPhone ? 'Contact' : 'Address')}</Button>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}