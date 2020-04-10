import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import Detail from './pages/Detail';
import Cart from './components/Cart';
import CartItems from './components/CartItems';

class App extends React.Component {
  render() {
    return(  
      <Router>
        <ProductsProvider>
          <CartProvider>
            <Switch>
              <Route 
                exact path="/" 
                render={(props) => 
                  <div className="App">
                    <Cart />
                    <CartItems />
                    <Home />
                  </div>
                }
              />
              <Route 
                exact path="/product/:title" 
                render={props => 
                  <div className="App">
                    <Cart />
                    <CartItems />
                    <Detail {...props} />
                 </div>
                } 
              />
            </Switch>
          </CartProvider>
        </ProductsProvider>
      </Router>
    )
  }
}

export default App;
