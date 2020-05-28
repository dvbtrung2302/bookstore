import React from 'react';
import axios from 'axios';

export const AdminContext = React.createContext();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export class AdminProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminToken: localStorage.getItem('adminToken') || '',
      orders: [],
      users: [],
      products: [],
      filter: {
        category: 'Category Type',
        price: 'Price',
        keyword: ''
      },
      open: false,
      product: {},
      isSave: false
    }
    this.adminLogin = this.adminLogin.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setProducts = this.setProducts.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('adminToken');
    axios.get('http://localhost:5000/admin/admin-get', { headers: {"Authorization" : `Bearer ${token}`}}, { cancelToken: source.token })
         .then(res => {
           this.setState({
             orders: res.data.orders,
             users: res.data.users,
             products: res.data.products
           })
         })
         .catch(err => {
           console.log(err);
         })
  }

  componentWillUnmount() {
    source.cancel();
  }

  adminLogin(token = '') {
    this.setState({
      adminToken: token
    })
  }

  onFilter (filterCategory = '', filterPrice = '', filterKeyword = '') {
    this.setState({
      filter: {
        category: filterCategory,
        price: filterPrice, 
        keyword: filterKeyword
      }
    })
  }

  setOpen(open) {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    this.setState({
      open: open
    })
  }

  setProduct(product = {}) {
    this.setState({
      product: product
    })
  }

  setProducts() {
    const token = localStorage.getItem('adminToken');
    console.log('re-rendering....');
    axios.get('http://localhost:5000/admin/admin-get', { headers: {"Authorization" : `Bearer ${token}`}}, { cancelToken: source.token })
         .then(res => {
           this.setState({
             products: res.data.products,
             isSave: true
           }, () => {
            setTimeout(() => {
              this.setState({
                isSave: false
              })
            }, 2000)
           })
         })
         .catch(err => {
           console.log(err);
         })
  }

  render() {
    const { 
      adminToken, 
      orders, 
      users, 
      filter, 
      products, 
      open, 
      product,
      isSave
    } = this.state;
    let filtedProducts = products;

    const revenue = orders.reduce((acc, current) => {
      return acc + current.totalPrice;
    }, 0);

    if (filter.category !== 'Category Type') {
      filtedProducts = filtedProducts.filter(product => {
        return product.category.toLowerCase() === filter.category.toLowerCase();
      })
    }

    if (filter.price !== 'Price') {
      if (filter.price === 'Highest to Lowest') {
        filtedProducts = filtedProducts.concat().sort((a, b) => {
          return b.price - a.price;
        })
      } else {
        filtedProducts = filtedProducts.concat().sort((a, b) => {
          return a.price - b.price;
        })
      }
    }

    if (filter.keyword) {
      filtedProducts = filtedProducts.filter(product => {
        return product.title.toLowerCase().indexOf(filter.keyword.toLowerCase()) !== -1;
      })
    }

    return(
      <AdminContext.Provider value={{
        adminToken: adminToken,
        adminLogin: this.adminLogin,
        orders: orders,
        users: users,
        products: filtedProducts,
        revenue: revenue,
        filter: filter,
        onFilter: this.onFilter,
        open: open,
        setOpen: this.setOpen,
        product: product,
        setProduct: this.setProduct,
        setProducts: this.setProducts,
        isSave: isSave
      }}>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}