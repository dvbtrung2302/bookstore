import React from 'react';

import ProductView from '../../components/Client/ProductView';
import TopMenu from '../../components/Client/TopMenu';
import RelatedItems from '../../components/Client/RelatedItems';
import Cart from '../../components/Client/Cart';
import CartItems from '../../components/Client/CartItems';

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