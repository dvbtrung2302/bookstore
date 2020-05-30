import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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

import '../../css/Client/UserInfo.css';
import { AreaContext } from '../../contexts/AreaContext';

const UserInfo = (props) => {
  const { data, isPhone, handleSubmit, handleInput} = props;
  const [modal, setModal] = useState(false);
  const [ districts, setDistricts ] = useState([]);
  const { cities, handleCityClick } = useContext(AreaContext);
  const toggle = () => setModal(!modal);
  const externalCloseBtn = <button className="auth close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
        
    axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${data.city}`, { cancelToken: source.token })
         .then(res => {
           setDistricts(res.data)
         })
         .catch(err => {
           console.log(err);
         })

    return () => {
      source.cancel();
    }
  }, [data.city])
  
  return(
    <div className="UserInfo">
      <div className="info">{isPhone ? data.phone : `${data.address}, ${data.district}, ${data.city}`}</div>
      <div className="edit-btn" onClick={toggle}>
        <FontAwesomeIcon icon={faPen} size="xs" />
        <Modal isOpen={modal} toggle={toggle} centered external={externalCloseBtn} autoFocus={false}>
          <div className="edit-modal">
            <h3 className="bt-header">{'Edit ' + (isPhone ? 'Contact' : 'Address')}</h3>
            <Form className="AuthForm p-0" onSubmit={handleSubmit}>
              <FormGroup>
              {
                !isPhone &&
                <Label for="address">
                  ADDRESS
                  <span className="ml-1 text-danger">*</span>
                </Label>
              }
                <Input 
                  type="text"
                  name={isPhone ? 'phone' : 'address'}
                  value={isPhone ? data.phone : data.address}
                  onChange={handleInput}
                  autoFocus
                  required
                  autoComplete="off"
                />
              </FormGroup>
              {
                !isPhone &&
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
                      handleInput(event); 
                      handleCityClick(event)
                    }} 
                    defaultValue={data.city}
                    autoComplete="off"
                  >
                    <option>Tỉnh/Thành phố</option>
                    { cities.map(city => <option key={city.name}>{city.name}</option>)}
                  </Input>
                </FormGroup>
              }
              {
                !isPhone &&
                <FormGroup>
                  <Label for="district">
                    District
                    <span className="ml-1 text-danger">*</span>
                  </Label>
                  <Input 
                    type="select" 
                    name="district" 
                    id="district" 
                    onChange={handleInput} 
                    defaultValue={data.district}
                    autoComplete="off"
                  >
                    <option>Quận/Huyện</option>
                    { districts.map(district => <option key={district.name}>{district.name}</option>)}
                  </Input>
                </FormGroup>
              }
              <Button block size="lg" type="submit">{'Save ' + (isPhone ? 'Contact' : 'Address')}</Button>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  data: PropTypes.shape({
    phone: PropTypes.string,
    address: PropTypes.string,
    district: PropTypes.string,
    city: PropTypes.string
  }),
  isPhone: PropTypes.bool,
  handleInput: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default UserInfo;