import React from 'react';
import PropTypes from 'prop-types';

const LegendItems = (props) => {
  const {
    dot,
    title,
    type,
    amount
  } = props
  return(
    <div className="LegendItems">
      <div className="title">
        <div 
          className="dot" 
          style={{
            backgroundColor: `${dot}`
          }}></div>
        <span className="admin-header">{title}</span>
      </div>
      <div className="amount">{type !== "client" ? "$" : null}{amount}</div>
    </div>
  );
}

LegendItems.propTypes = {
  dot: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  amount: PropTypes.number
}

export default LegendItems