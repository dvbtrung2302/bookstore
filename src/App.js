import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout';
import OrderReceived  from './pages/OrderReceived';
import UserProfile from './pages/UserProfile';
import Orders from './pages/Orders';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import { AreaProvider } from './contexts/AreaContext';
import Alert from './components/Alert';
import TopMenu from './components/TopMenu';
import UserRoute from './components/UserRoute';
import AdminRoute from './components/Admin/AdminRoute';
import { AdminProvider } from './contexts/AdminContext';
import NavBar from './components/Admin/NavBar';

const stripePromise = loadStripe('pk_test_UveTYJMSFhA9nBMhfj2AE6K600nYtR677m');

class App extends React.Component {
  render() {
    return(  
      <Router> 
        <ProductsProvider>
          <CartProvider>
            <AuthProvider>
              <OrderProvider>
                <AreaProvider>
                  <Elements stripe={stripePromise}>
                    <div className="App">
                      <Route path={["/checkout", "/order-received/:id", "/profile", "/order"]} render={props => <TopMenu {...props}/>} />
                      <Route path={["/", "product:title", "/checkout", "/order-received/:id", "/profile", "/order"]} render={props => <Alert option="login" />} />
                      <Route exact path={["/admin"]} component={NavBar} />
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/product/:title" component={Detail} />
                        {/* UserRoute */}
                        <UserRoute exact path="/checkout" component={Checkout} />
                        <UserRoute exact path="/order-received/:id" component={OrderReceived} />
                        <UserRoute exact path="/profile" component={UserProfile} />
                        <UserRoute exact path="/order" component={Orders} />
                        {/* AdminRoute */}
                        <AdminProvider>
                          <Route exact path="/admin/login" component={AdminLogin} />
                          <AdminRoute exact path="/admin" component={Admin} />
                        </AdminProvider>
                      </Switch>
                    </div>
                  </Elements>
                </AreaProvider>
              </OrderProvider>
            </AuthProvider>
          </CartProvider>
        </ProductsProvider>
      </Router>
    )
  }
}

export default App;
