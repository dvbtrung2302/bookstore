import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function PromotionItem(props) {
  const {
    image,
    id,
  } = props;
  return (
    <div className="promotion-item">
      <Link to={`/promotion/${id}`}>
        <img src={image} />
      </Link>
    </div>
  );
}

export default PromotionItem;