import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PromotionItem from './PromotionItem';
import Slider from "react-slick";

import './style.css';

function PromotionBlock(props) {
  const [promotions, setPromotions] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('https://dvbt-bookstore.herokuapp.com/promotion');
        setPromotions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPromotions();
  }, [])


  return (
    <div className="promotion-block">
      <Slider {...settings}>
          {
            promotions.map(item =>
              <div key={item._id}>
                <PromotionItem 
                  image={item.image}
                  id={item._id}
                />  
              </div>
            )
          }
      </Slider>
    </div>
  );
}

export default PromotionBlock;