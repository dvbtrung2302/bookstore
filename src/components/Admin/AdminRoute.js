import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AdminContext } from '../../contexts/AdminContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { adminToken } = useContext(AdminContext);
  return(
    <Route 
      {...rest}
      render={props =>
        adminToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
}

export default AdminRoute;