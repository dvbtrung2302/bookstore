import React, { useContext }from 'react';
import { Alert } from 'reactstrap';

import '../css/Alert.css';
import { AuthContext } from '../contexts/AuthContext';

export default function(props) {
  const { isAlertOpen } = useContext(AuthContext);
  return(
    <div className="Alert">
      <Alert isOpen={isAlertOpen}>Welcome Back!</Alert>
    </div>
  );
}