import React from 'react';

import ProductView from '../components/ProductView';
import TopMenu from '../components/TopMenu';
import RelatedItems from '../components/RelatedItems';
import Cart from '../components/Cart';
import CartItems from '../components/CartItems';

class Detail extends React.Component {
  render() {
    return(
      <div 
        className="Detail py-5" 
        style={{
          backgroundColor:"rgb(247, 247, 247)",
          marginTop:"85px"
        }}>
          <TopMenu />
          <Cart />
          <CartItems {...this.props} />
          <ProductView key={this.props.match.params.title} {...this.props}/>
          <RelatedItems />
      </div>
    );
  }
}

export default Detail;