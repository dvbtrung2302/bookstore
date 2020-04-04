import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import TopMenu from './components/TopMenu';
import Home from './pages/Home';
import TopMenuMobile from './components/TopMenuMobile';
import ProductsContext from './contexts/ProductsContext';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.get('https://dvbt-bookstore.herokuapp.com/products')
         .then(res => {
           this.setState({
             products: res.data
           })
         })
  }

  render() {
    const { products } = this.state;
    return(
      <ProductsContext.Provider value={{
        products: products
      }}>
        <Router>
          <div className="App">
            <TopMenu />
            <TopMenuMobile />
            <Home />
          </div>
        </Router>
      </ProductsContext.Provider>
    )
  }
}

export default App;
