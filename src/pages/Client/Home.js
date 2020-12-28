import React from 'react';

import Banner from '../../components/Client/Banner';
import Main  from '../../components/Client/Main';
import TopMenu from '../../components/Client/TopMenu';
import Cart from '../../components/Client/Cart';
import CartItems from '../../components/Client/CartItems';
import PromotionBlock from '../../components/Client/PromotionBlock';

class Home extends React.Component {
  componentDidMount() {
    if (window.innerHeight > 900) {
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight - 90,
          behavior: "smooth"
        });
      }, 600);
    }
    document.title = 'PickBazar'
  }

  render() {
    return(
      <div className="Home">
        <TopMenu isTopMenu={true} />
        <Cart />
        <CartItems {...this.props} />
        <Banner />
        <PromotionBlock />
        <Main />
      </div>
    );
  }
}

export default Home;