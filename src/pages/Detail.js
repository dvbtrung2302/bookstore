import React from 'react';

import ProductView from '../components/ProductView';
import TopMenu from '../components/TopMenu';

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
          <ProductView {...this.props}/>
      </div>
    );
  }
}

export default Detail;