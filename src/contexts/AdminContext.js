import React from 'react';
import axios from 'axios';

export const AdminContext = React.createContext();

export class AdminProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminToken: localStorage.getItem('adminToken') || '',
      orders: [],
      users: []
    }
    this.adminLogin = this.adminLogin.bind(this);
  }

  componentDidMount() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const token = localStorage.getItem('adminToken');
    axios.get('http://localhost:5000/order/get-orders', { headers: {"Authorization" : `Bearer ${token}`}}, { cancelToken: source.token })
         .then(res => {
           this.setState({
             orders: res.data.orders,
             users: res.data.users
           })
         })
         .catch(err => {
           console.log(err);
         })
  }

  adminLogin(token = '') {
    this.setState({
      adminToken: token
    })
  }

  render() {
    const { adminToken, orders, users } = this.state;
    const revenue = orders.reduce((acc, current) => {
      return acc + current.totalPrice;
    }, 0);

    return(
      <AdminContext.Provider value={{
        adminToken: adminToken,
        adminLogin: this.adminLogin,
        orders: orders,
        users: users,
        revenue: revenue
      }}>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}