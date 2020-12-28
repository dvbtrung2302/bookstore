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
      promotions: [],
      filter: {
        category: 'Category Type',
        price: 'Price',
        payment: 'Payment Method',
        amount: 'Amount',
        orderAmount: 'Order Amount',
        keyword: '',
        nameKeyword: '',
        addressKeyword: ''
      },
      open: false,
      product: {},
      promotion: {},
      isSave: false,
      option: '',
      loading: true
    }
    this.adminLogin = this.adminLogin.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setProducts = this.setProducts.bind(this);
    this.onOrdersFilter = this.onOrdersFilter.bind(this);
    this.onCustomersFilter = this.onCustomersFilter.bind(this);
    this.setStateDefault = this.setStateDefault.bind(this);
    this.setPromotions = this.setPromotions.bind(this);
    this.setPromotion = this.setPromotion.bind(this);
  }

  async componentDidMount() {
    const { adminToken } = this.state;
    axios.get('https://dvbt-bookstore.herokuapp.com/admin/admin-get', { headers: {"Authorization" : `Bearer ${adminToken}`}}, { cancelToken: source.token })
         .then(res => {
           this.setState({
             orders: res.data.orders.reverse(),
             users: res.data.users,
             products: res.data.products,
             loading: false
           })
         })
         .catch(err => {
           console.log(err);
         })

    try {
      const response = await axios.get('https://dvbt-bookstore.herokuapp.com/promotion');
      this.setState({
        promotions: response.data.reverse()
      })
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    source.cancel();
  }

  adminLogin(token = '') {
    axios.get('https://dvbt-bookstore.herokuapp.com/admin/admin-get', { headers: {"Authorization" : `Bearer ${token}`}}, { cancelToken: source.token })
         .then(res => {
           this.setState({
             adminToken: token,
             orders: res.data.orders,
             users: res.data.users,
             products: res.data.products,
             loading: false
           })
         })
         .catch(err => {
           console.log(err);
         })
  }

  setStateDefault() {
    this.setState({
      adminToken: localStorage.getItem('adminToken') || '',
      orders: [],
      users: [],
      products: [],
      filter: {
        category: 'Category Type',
        price: 'Price',
        payment: 'Payment Method',
        amount: 'Amount',
        orderAmount: 'Order Amount',
        keyword: '',
        nameKeyword: '',
        addressKeyword: ''
      },
      open: false,
      product: {},
      isSave: false,
      option: '',
      loading: true
    })
  }

  onFilter (filterCategory = '', filterPrice = '', filterKeyword = '') {
    const { filter } = this.state;
    this.setState({      
      filter: {
        ...filter,
        category: filterCategory,
        price: filterPrice, 
        keyword: filterKeyword
      }
    })
  }

  onOrdersFilter (payment = '', amount = '', addressKeyword = '') {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        payment: payment,
        amount: amount,
        addressKeyword: addressKeyword
      }
    })
  }

  onCustomersFilter (nameKeyword = '',orderAmount = '') {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        nameKeyword: nameKeyword,
        orderAmount: orderAmount
      }
    })
  }

  setOpen(open, option = '') {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    this.setState({
      open: open,
      option: option
    })
  }

  setProduct(product = {}) {
    this.setState({
      product: product
    })
  }

  setPromotion(promotion) {
    this.setState({
      promotion: promotion
    })
  }

  setProducts() {
    const token = localStorage.getItem('adminToken');
    axios.get('https://dvbt-bookstore.herokuapp.com/admin/admin-get', { headers: {"Authorization" : `Bearer ${token}`}}, { cancelToken: source.token })
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

  async setPromotions() {
    try {
      const response = await axios.get('https://dvbt-bookstore.herokuapp.com/promotion');
      this.setState({
        promotions: response.data.reverse()
      })
    } catch (error) {
      console.log(error);
    }
  }

  removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
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
      isSave,
      option,
      promotions,
      promotion,
      loading
    } = this.state;

    let filtedProducts = products;
    let filtedOrders = orders;
    
    const revenue = orders.reduce((acc, current) => {
      return acc + current.totalPrice;
    }, 0);
    
    const newUsers = users.map(user => {
      let totalOrder = 0;
      let totalAmount = 0;
      for (const order of orders) {
        if (order.userId === user._id){
          user = {...user, totalOrder: totalOrder += 1, totalAmount: totalAmount += order.totalPrice}
        } else {
          user = {...user, totalOrder: totalOrder, totalAmount: totalAmount}
        }
      }
      return user;
    })

    let filtedUsers = newUsers;

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

    if (filter.payment !== 'Payment Method') {
      const paymentMethod = filter.payment === 'Cash On Delivery' ? 'cash' : 'card';
      filtedOrders = filtedOrders.filter(order => {
        return order.payment === paymentMethod;
      })
    }

    if (filter.amount !== 'Amount') {
      if (filter.amount === 'Highest to Lowest') {
        filtedOrders = filtedOrders.concat().sort((a, b) => {
          return b.totalPrice - a.totalPrice;
        })
      } else {
        filtedOrders = filtedOrders.concat().sort((a, b) => {
          return a.totalPrice - b.totalPrice;
        })
      }
    }

    if (filter.keyword) {
      filtedProducts = filtedProducts.filter(product => {
        return product.title.toLowerCase().indexOf(filter.keyword.toLowerCase()) !== -1;
      })
    }

    if (filter.addressKeyword) {
      filtedOrders = filtedOrders.filter(order => {
        const userAdress = this.removeAccents(`${order.address}, ${order.district}, ${order.city}`);
        return userAdress.toLowerCase().indexOf(filter.addressKeyword.toLowerCase()) !== -1;
      })
    }

    if (filter.nameKeyword) {
      filtedUsers = filtedUsers.filter(user => {
        return this.removeAccents(user.name).toLowerCase().indexOf(filter.nameKeyword.toLowerCase()) !== -1;
      })
    }

    if (filter.orderAmount !== 'Order Amount') {
      if (filter.orderAmount === 'Highest to Lowest') {
        filtedUsers = filtedUsers.concat().sort((a, b) => {
          return b.totalAmount - a.totalAmount;
        })
      } else {
        filtedUsers = filtedUsers.concat().sort((a, b) => {
          return a.totalAmount - b.totalAmount;
        })
      }
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
        isSave: isSave,
        option: option,
        promotions: promotions,
        setPromotions: this.setPromotions,
        onOrdersFilter: this.onOrdersFilter,
        filtedOrders: filtedOrders,
        onCustomersFilter: this.onCustomersFilter,
        newUsers: filtedUsers,
        setStateDefault: this.setStateDefault,
        setPromotion: this.setPromotion,
        promotion: promotion,
        loading: loading
      }}>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}