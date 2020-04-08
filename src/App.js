import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TopMenu from './components/TopMenu';
import Home from './pages/Home';
import { ProductsProvider } from './contexts/ProductsContext';

class App extends React.Component {
  render() {
    return(  
      <Router>
        <Route exact path="/">
          <ProductsProvider>
            <div className="App">
              <TopMenu />
              <Home/>
            </div>
          </ProductsProvider>
        </Route>
      </Router>
    )
  }
}

export default App;
