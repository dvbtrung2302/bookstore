import React from 'react';

import Banner from '../components/Banner';
import Main  from '../components/Main';
import TopMenu from '../components/TopMenu';

class Home extends React.Component {
  componentDidMount() {
    if (window.innerHeight > 900) {
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight - 90,
          behavior: "smooth"
        });
      }, 300);
    }
  }
  render() {
    return(
      <div className="Home">
        <TopMenu isTopMenu={true} />
        <Banner />
        <Main />
      </div>
    );
  }
}

export default Home;