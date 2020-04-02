import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './css/SearchBar.css';

export default function(props) {
  const { isTopMenu } = props;
  return(
    <div className="SearchBar" style={{justifyContent:"center"}}>
      {!isTopMenu && <span>Book</span>}
      {
        isTopMenu ?
        <form 
          style={{background:"rgb(243, 243, 243)", maxWidth: "70%"}}  
        >
          <FontAwesomeIcon icon={faSearch} className="mx-3"/>
          <input 
            style={{background:"rgb(243, 243, 243)"}} 
            placeholder="Search your products from here" 
            className="p-0"
          />
        </form> :
         <form>
          <input placeholder="Search your products from here" />
       </form>
      }
        {
          !isTopMenu &&
          <button>
            <FontAwesomeIcon icon={faSearch} className="mr-2"/>
            Search
          </button>
        }
    </div>
  )
}