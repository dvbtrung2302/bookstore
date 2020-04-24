import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Alert from './components/Alert';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import './App.css';

const stripePromise = loadStripe('pk_test_UveTYJMSFhA9nBMhfj2AE6K600nYtR677m');

class App extends React.Component {
  render() {
    return(  
      <Router> 
        <ProductsProvider>
          <CartProvider>
            <AuthProvider>
                <div className="App">
                  <Alert />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product/:title" component={Detail} />
                    <AuthenticatedComponent>
                      <Elements stripe={stripePromise}>
                        <Route exact path="/checkout" component={Checkout} />
                      </Elements>
                    </AuthenticatedComponent>
                  </Switch>
                </div>
            </AuthProvider>
          </CartProvider>
        </ProductsProvider>
      </Router>
    )
  }
}

export default App;
