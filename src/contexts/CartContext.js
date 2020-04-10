import React from 'react';

export const CartContext = React.createContext();

export class CartProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      isCartClicked: false
    }
    this.setCartClicked = this.setCartClicked.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setCartClicked(isClick = Boolean) {
    this.setState({
      isCartClicked: isClick
    })
  }

  isExists(cartItems = [], item = {}) {
    for (let cartItem of cartItems) {
      if (cartItem._id === item._id) {
        return true;
      }
    }
    return false;
  }

  addToCart(item = {}) {
    const { cartItems } = this.state;
    let list = cartItems;
    if (cartItems.length === 0) {
      list = list.concat({...item, quantity: 1});
    }  else {
      if (!this.isExists(list, item)) {
        list = list.concat({...item, quantity: 1});
      } else {
        list = cartItems.map(value => {
          if (value._id === item._id) {
            return { ...value, quantity: value.quantity + 1};
          } else {
            return { ...value };
          }
        })
      }
    }
    this.setState({
      cartItems: list
    })
  }

  render() {
    const { isCartClicked, cartItems } = this.state;
    return(
      <CartContext.Provider 
        value={{
          setCartClicked: this.setCartClicked,
          isCartClicked: isCartClicked, 
          addToCart: this.addToCart,
          cartItems: cartItems
        }}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
