import React from 'react';

import Banner from '../components/Banner';
import Main  from '../components/Main';

class Home extends React.Component {
  render() {
    return(
      <div className="Home">
        <Banner />
        <Main />
      </div>
    );
  }
}

export default Home;