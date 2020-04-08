import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import { ProductsProvider } from './contexts/ProductsContext';
import Detail from './pages/Detail';

class App extends React.Component {
  render() {
    return(  
      <Router>
        <ProductsProvider>
          <div className="App">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:title" component={Detail}/>}
              </Switch>
          </div>
        </ProductsProvider>
      </Router>
    )
  }
}

export default App;
