import React from 'react';

import Banner from '../components/Banner';
import Main  from '../components/Main';
import TopMenu from '../components/TopMenu';
import Cart from '../components/Cart';
import CartItems from '../components/CartItems';

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
        <Cart />
        <CartItems {...this.props} />
        <Banner />
        <Main />
      </div>
    );
  }
}

export default Home;