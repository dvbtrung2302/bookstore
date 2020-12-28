import React, { useEffect, useState } from 'react';
import axios from "axios";

import ProductView from '../../components/Client/ProductView';
import TopMenu from '../../components/Client/TopMenu';
import RelatedItems from '../../components/Client/RelatedItems';
import Cart from '../../components/Client/Cart';
import CartItems from '../../components/Client/CartItems';
import PromotionView from '../../components/Client/PromotionBlock/PromotionView';

const Promotion = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://dvbt-bookstore.herokuapp.com/promotion/get-promotion?id=${props.match.params.id}`)  
        setData(res.data);    
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [props.match.params.id])

  return(
    <div 
      className="Promotion py-5" 
      style={{
        backgroundColor:"rgb(247, 247, 247)",
        marginTop:"85px"
      }}>
        <TopMenu />
        <Cart />
        <CartItems {...props} />
        <PromotionView 
          {...data}
        />
    </div>
  );
}

export default Promotion;