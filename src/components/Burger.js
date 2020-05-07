import React from 'react';
import PropTypes from 'prop-types';

import '../css/Burger.css';

const Burger = (props) => {
  const { isClick, handleCatClick, isTopMenu } = props;
  return(
    <div 
      className={isClick ? "Burger toggle" : "Burger"} 
      onClick={handleCatClick}
      style={isTopMenu && {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center", 
        alignItems:"center",
        padding:"0",
        height:"auto",
        marginLeft:"5px"        
      }}  
    >
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
}

Burger.propTypes = {
  isClick: PropTypes.bool,
  handleCatClick: PropTypes.func,
  isTopMenu: PropTypes.bool
}

export default Burger;