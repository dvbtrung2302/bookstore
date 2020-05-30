import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

const UserRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);
  return(
    <Route 
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default UserRoute;