import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import TopMenu from './components/TopMenu';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return(
      <Router>
        <div className="App">
          <TopMenu />
          <Home />
        </div>
      </Router>
    )
  }
}

export default App;
