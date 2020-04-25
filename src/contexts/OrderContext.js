import React from 'react';

export const OrderContext = React.createContext();

export class OrderProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      order: {}
    }
    this.setOrder = this.setOrder.bind(this);
  }

  setOrder(order = {}) {
    this.setState({
      order: order
    })
  }
  render() {
    const { order } = this.state;
    return(
      <OrderContext.Provider value={{
        createOrder: this.setOrder,
        order: order
      }}>
        {this.props.children}      
      </OrderContext.Provider>
    );
  }
}
