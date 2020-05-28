import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import '../css/Alert.css';
import { AuthContext } from '../contexts/AuthContext';
import { AdminContext } from '../contexts/AdminContext';

const Alert = (props) => {
  const { isOpen, option } = props;
  const { isAlertOpen } = useContext(AuthContext);
  const { isSave } = useContext(AdminContext);

  const render = () => {
    switch(option) {
      case 'login': 
        return <div className={isAlertOpen ? "bt-alert alert-active" : "bt-alert" }>Welcome Back!</div>;
      case 'edit':
        return <div className={isOpen ? "bt-alert alert-active" : "bt-alert" }>Save Successfully!</div> 
      case 'admin':
        return <div className={isSave ? "bt-alert alert-active" : "bt-alert"}>Successfully!</div>
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

Alert.propTypes = {
  isOpen: PropTypes.bool,
  option: PropTypes.string
}

export default Alert;

