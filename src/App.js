import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import TopMenu from './components/TopMenu';
import Home from './pages/Home';
import TopMenuMobile from './components/TopMenuMobile';
import { ProductsProvider } from './contexts/ProductsContext';

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
      <Router>
        <Route 
          exact path="/" 
          render={props => 
          <ProductsProvider products={products} {...props}>
            <div className="App">
              <TopMenu />
              <TopMenuMobile />
              <Home/>
            </div>
          </ProductsProvider>
        }/>
      </Router>
    )
  }
}

export default App;
