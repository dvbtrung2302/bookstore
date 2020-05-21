import React from 'react';
import PropTypes from 'prop-types';

import '../css/Burger.css';

const Burger = (props) => {
  const { 
    isClick, 
    handleCatClick, 
    handleBurgerClick, 
    isTopMenu, 
    isNav 
  } = props;
  return(
    <div 
      className={isClick ? "Burger toggle" : "Burger"} 
      onClick={isNav ? handleBurgerClick : handleCatClick}
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
  handleBurgerClick: PropTypes.func,
  isTopMenu: PropTypes.bool,
  isNav: PropTypes.bool
}

export default Burger;