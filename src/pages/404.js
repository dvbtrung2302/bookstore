import React from 'react';

const NotFound = () => {
  return(
    <div 
      className="404NotFound"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "600"
      }}
    >
      <h1
        style={{
          borderRight: "1px solid rgba(0, 0, 0, 0.3)",
          margin: "0px 20px 0px 0px",
          padding: "10px 23px 10px 0px",
          fontSize: "30px",
          fontWeight: "600"
        }}
      >
        404
      </h1>
      This page could not be found.
    </div>
  );
}

export default NotFound;