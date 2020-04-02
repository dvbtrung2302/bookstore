import React from 'react';

export default function(WrappedComponent, isTopMenu) {
  return class extends React.Component {
    render() {
      return(
        <WrappedComponent isTopMenu={isTopMenu} />
      )
    }
  }
}