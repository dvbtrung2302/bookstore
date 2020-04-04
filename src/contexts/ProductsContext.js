import React from 'react';

export const ProductsContext = React.createContext();

export class ProductsProvider extends React.Component {
  render() {
    const { products } = this.props
    return(
      <ProductsContext.Provider value={{
        products: products
      }}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}