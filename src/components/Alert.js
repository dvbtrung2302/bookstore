import React, { useContext }from 'react';
import { Alert } from 'reactstrap';

import '../css/Alert.css';
import { AuthContext } from '../contexts/AuthContext';

export default function(props) {
  const { isAlertOpen } = useContext(AuthContext);
  const render = () => {
    switch(props.option) {
      case 'login': 
        return <Alert isOpen={isAlertOpen}>Welcome Back!</Alert>;
      case 'edit':
        return <Alert isOpen={props.isOpen}>Save Successfully!</Alert> 
      default:
        return;
    }
  }
  return(
    <div className="Alert">
      { render() }
    </div>
  );
}