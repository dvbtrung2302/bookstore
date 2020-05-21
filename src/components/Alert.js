import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import '../css/Alert.css';
import { AuthContext } from '../contexts/AuthContext';

const Alert = (props) => {
  const { isOpen } = props;
  const { isAlertOpen } = useContext(AuthContext);

  const render = () => {
    switch(props.option) {
      case 'login': 
        return <div className={isAlertOpen ? "bt-alert alert-active" : "bt-alert" }>Welcome Back!</div>;
      case 'edit':
        return <div className={isOpen ? "bt-alert alert-active" : "bt-alert" }>Save Successfully!</div> 
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
  isOpen: PropTypes.bool
}

export default Alert;

