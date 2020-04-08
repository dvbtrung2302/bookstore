import React from 'react';
import axios from 'axios';

export const ProductsContext = React.createContext();

export class ProductsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      displayCategory: null,
      keyword: '',
    }
    this.setCategory = this.setCategory.bind(this);
    this.setStateDefault = this.setStateDefault.bind(this);
    this.setKeyword = this.setKeyword.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/products')
         .then(res => {
           this.setState({
             products: res.data
           })
         })
         .catch(err => {
           console.log(err);
         })
  }

  componentWillUnmount() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios.get('http://localhost:5000/products', {
      cancelToken: source.token
    })
  }

  setCategory(category = '') {
    window.scrollTo({
      top: window.innerHeight - 90,
      behavior: "smooth"
    });
    this.setState({
      displayCategory: category
    })
  }

  setKeyword(keyword = '') {
    this.setState({
      keyword: keyword,
      displayCategory: null
    })
  }

  setStateDefault() {
    this.setState({
      displayCategory: null,
      keyword: ''
    })
  }

  filterProducts(category = '', keyword = '') {
    const { products } = this.state;
    if (category) {
      const filteredProducts = products.filter(function(product) {
        return product.category.indexOf(category) !== -1;
      });
      return filteredProducts;
    }
    if (keyword) {
      const filteredProducts = products.filter(function(product) {
        return product.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      return filteredProducts;
    }
    return products;
  }

  render() {
    const { displayCategory, keyword } = this.state;
    const products = this.filterProducts(displayCategory, keyword);
    return(
      <ProductsContext.Provider value={{
        products: products,
        setCategory: this.setCategory,
        setStateDefault: this.setStateDefault,
        setKeyword: this.setKeyword,
        categoryName: displayCategory,
        keyword: keyword
      }}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}