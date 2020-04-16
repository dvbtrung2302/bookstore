import React from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') || '',
      user: {},
      isAlertOpen: false
    }
    this.setToken = this.setToken.bind(this);
    this.setStateDefault = this.setStateDefault.bind(this);
    this.setAlertOpen = this.setAlertOpen.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    if (token) {
      axios.get('http://localhost:5000/user', { headers: {"Authorization" : `Bearer ${token}`}} )
           .then(res => {
             this.setState({
              user: res.data
             })
           });
    }
  }

  setToken(token = '') {
    axios.get('http://localhost:5000/user', { headers: {"Authorization" : `Bearer ${token}`}} )
         .then(res => {
           this.setState({
            user: res.data
           })
         })
  }

  setStateDefault() {
    this.setState({
      token: '',
      user: ''
    })  
  }

  setAlertOpen() {
    this.setState({
      isAlertOpen: true
    }, () => {
      setTimeout(() => {
        this.setState({
          isAlertOpen: false
        })
      }, 2000)
    })
  }

  render() {
    const { token, user, isAlertOpen }= this.state;
    return(
      <AuthContext.Provider value={{
        token: token,
        setToken: this.setToken,
        setStateDefault: this.setStateDefault,
        user: user,
        setAlertOpen: this.setAlertOpen,
        isAlertOpen: isAlertOpen
      }}>
        {this.props.children}      
      </AuthContext.Provider>
    );
  }
}
