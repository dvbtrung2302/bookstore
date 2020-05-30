import React from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') || '',
      user: {},
      isAlertOpen: false, 
      isCheckoutClick: false,
      loading: true
    }
    this.setStateDefault = this.setStateDefault.bind(this);
    this.setAlertOpen = this.setAlertOpen.bind(this);
    this.setCheckoutClick = this.setCheckoutClick.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  componentDidMount() {
    axios.get('https://dvbt-bookstore.herokuapp.com/user', { headers: {"Authorization" : `Bearer ${this.state.token}`}}, { cancelToken: source.token })
         .then(res => {
            this.setState({
              user: res.data,
              loading: false
            })
         })
         .catch(err => {
           console.log(err);
         })
  }

  componentWillUnmount() {
    source.cancel();
  }

  userLogin(token = '') {
    axios.get('https://dvbt-bookstore.herokuapp.com/user', { headers: {"Authorization" : `Bearer ${token}`}} )
    .then(res => {
      this.setState({
        token: token,
        user: res.data,
        loading: false
      })
    })
  }

  setStateDefault() {
    this.setState({
      token: '',
      isAlertOpen: false,
      user: {},
      isCheckoutClick: false
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

  setCheckoutClick() {
    this.setState({
      isCheckoutClick: !this.state.isCheckoutClick
    })
  }

  render() {
    const { token, user, isAlertOpen, isCheckoutClick }= this.state;
    return(
      <AuthContext.Provider value={{
        token: token,
        user: user,
        setToken: this.setToken,
        setStateDefault: this.setStateDefault,
        setAlertOpen: this.setAlertOpen,
        isAlertOpen: isAlertOpen,
        isCheckoutClick: isCheckoutClick,
        setCheckoutClick: this.setCheckoutClick,
        userLogin: this.userLogin
      }}>
        {this.props.children}      
      </AuthContext.Provider>
    );
  }
}
