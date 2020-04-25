import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

const AuthenticatedComponent = (props) => {
  // const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      props.history.push('/');
    }
    // axios.get('http://localhost:5000/user', { headers: {"Authorization" : `Bearer ${token}`}} )
    //      .then(res => {
    //         setUser(res.data);
    //       })
    //      .catch(err => {
    //        localStorage.removeItem('token');
    //        props.history.push('/');
    //      })
    // return () => {
    //   const CancelToken = axios.CancelToken;
    //   const source = CancelToken.source();

    //   axios.get('http://localhost:5000/user', {
    //     cancelToken: source.token
    //   })
    // }
  }, [props.history])
  return(
    <div>
      {props.children}
    </div>
  );
}

export default withRouter(AuthenticatedComponent);