import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Cart from './components/Cart';
import CartItems from './components/CartItems';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Alert from './components/Alert';

class App extends React.Component {
  render() {
    return(  
      <Router> 
        <ProductsProvider>
          <CartProvider>
            <AuthProvider>
                <div className="App">
                  <Cart />
                  <CartItems />
                  <Alert />
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/product/:title" component={Detail} />
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
