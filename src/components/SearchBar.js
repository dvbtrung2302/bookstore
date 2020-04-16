import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ProductsContext } from '../contexts/ProductsContext';
import '../css/SearchBar.css';

export default function(props) {
  const { isTopMenu, isTopMenuMobile, setClicked } = props;
  const [text, setText] = useState('');
  const { setKeyword } = useContext(ProductsContext);

  const handleType = (event) => {
    if (event.keyCode === 13) {
        if (isTopMenuMobile) {
          setClicked();
        }
        setText('');
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth"
        });
        return setKeyword(event.target.value);
    }
  }

  const handleBtnClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
    return setKeyword(text);
  }
  return(
    <div 
      className={!isTopMenuMobile ? "SearchBar d-none d-xl-flex" : "SearchBar d-flex"}
      style={{justifyContent:"center"}}
    >
      {
        isTopMenuMobile &&   
        <div className="mobile-btn">
          <FontAwesomeIcon 
            icon={faArrowLeft}
            onClick={() => setClicked()}
          />
        </div>
      }
      {!isTopMenu && <span>Book</span>}
      <form 
        style={isTopMenu && {background:"rgb(243, 243, 243)"}}
        onSubmit={(event) => event.preventDefault()}  
      >
        {isTopMenu && <FontAwesomeIcon icon={faSearch} className="mx-3"/>}
        <input 
          style={isTopMenu && {background:"rgb(243, 243, 243)"}}
          type="text"
          placeholder="Search your products from here" 
          className="p-0"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyUp={(event) => handleType(event)}
        />
      </form> 
      {
        (!isTopMenu && !isTopMenuMobile) &&
        <button onClick={() => handleBtnClick()}>
          <FontAwesomeIcon icon={faSearch} className="mr-2"/>
          Search
        </button>
      }
      {
        isTopMenuMobile &&
        <div className="mobile-btn">
          <FontAwesomeIcon icon={faSearch} onClick={() => handleBtnClick()} />
        </div>
      }
  </div>
  )
}