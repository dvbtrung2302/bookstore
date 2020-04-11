import React from 'react';

export const CartContext = React.createContext();

export class CartProvider extends React.Component {
  constructor(props) {
    super(props);
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.state = {
      cartItems: cartItems,
      isCartClicked: false
    }
    this.setCartClicked = this.setCartClicked.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.increaseItem = this.increaseItem.bind(this);
    this.decreaseItem = this.decreaseItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
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
    }, () => {
      localStorage.setItem("cartItems", JSON.stringify(list));
    })
  }

  increaseItem(product = {}) {
    const { cartItems } = this.state;
    for (let item of cartItems) {
      if (product._id === item._id) {
        item.quantity += 1;
        break;
      }
    }
    this.setState({
      cartItems: cartItems
    }, () => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    })
  }

  decreaseItem(product = {}) {
    const { cartItems } = this.state;
    for (let item of cartItems) {
      if (product._id === item._id) {
        item.quantity -= 1;
        break;
      }
    } 
    this.setState({
      cartItems: cartItems.filter(item => item.quantity !== 0)
    }, () => {
      localStorage.setItem("cartItems", JSON.stringify( cartItems.filter(item => item.quantity !== 0)));
    })
  }

  removeItem(product = {}) {
    this.setState({
      cartItems: this.state.cartItems.filter(item => item._id !== product._id)
    }, () => {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems.filter(item => item._id !== product._id)));
    })
  }

  render() {
    const { isCartClicked, cartItems } = this.state;
    const totalPrice = cartItems.reduce((acc, current) => {
      return acc + (current.price * current.quantity);
    }, 0)
    return(
      <CartContext.Provider 
        value={{
          setCartClicked: this.setCartClicked,
          isCartClicked: isCartClicked, 
          addToCart: this.addToCart,
          cartItems: cartItems,
          totalPrice: totalPrice,
          increaseItem: this.increaseItem,
          decreaseItem: this.decreaseItem,
          removeItem: this.removeItem
        }}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
