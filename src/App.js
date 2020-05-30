import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout';
import OrderReceived  from './pages/OrderReceived';
import UserProfile from './pages/UserProfile';
import Orders from './pages/Orders';
import AdminLogin from './pages/Admin/AdminLogin';
import Admin from './pages/Admin/Admin';
import Products from './pages/Admin/Products';
import Customers from './pages/Admin/Customers';
import ProductFunc from './components/Admin/ProductFunc';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import { AreaProvider } from './contexts/AreaContext';
import Alert from './components/Alert';
import TopMenu from './components/TopMenu';
import UserRoute from './components/UserRoute';
import AdminRoute from './components/Admin/AdminRoute';
import { AdminProvider } from './contexts/AdminContext';
import NavBar from './components/Admin/NavBar';
import AdminOrders from './pages/Admin/Orders';
import NotFound from './pages/404';

const stripePromise = loadStripe('pk_test_UveTYJMSFhA9nBMhfj2AE6K600nYtR677m');

class App extends React.Component {
  render() {
    return(  
      <Router> 
        <ProductsProvider>
          <CartProvider>
            <AuthProvider>
              <OrderProvider>
                <AreaProvider>
                  <AdminProvider>
                    <Elements stripe={stripePromise}>
                      <div className="App">
                        <Route path={["/checkout", "/order-received/:id", "/profile", "/order"]} render={props => <TopMenu {...props}/>} />
                        <Route path={["/", "product:title", "/checkout", "/order-received/:id", "/profile", "/order"]} render={props => <Alert option="login" />} />
                        <Route exact path={["/admin", "/admin/products", "/admin/orders", "/admin/customers"]} component={NavBar} />
                        <Route exact path={["/admin", "/admin/products", "/admin/orders", "/admin/customers"]} component={ProductFunc} />
                        <Route path="/admin" render={props => <Alert option="admin" isOpen />} />
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/product/:title" location={{state: { id: 1}}} component={Detail} />
                          {/* UserRoute */}
                          <UserRoute exact path="/checkout" component={Checkout} />
                          <UserRoute exact path="/order-received/:id" component={OrderReceived} />
                          <UserRoute exact path="/profile" component={UserProfile} />
                          <UserRoute exact path="/order" component={Orders} />
                          {/* AdminRoute */}
                          <Route exact path="/admin/login" component={AdminLogin} />
                          <AdminRoute exact path="/admin" component={Admin} />
                          <AdminRoute exact path="/admin/products" component={Products} />
                          <AdminRoute exact path="/admin/orders" component={AdminOrders} />
                          <AdminRoute exact path="/admin/customers" component={Customers} />
                          {/* 404 */}
                          <Route exact path="*" component={NotFound} /> 
                        </Switch>
                      </div>
                    </Elements>
                  </AdminProvider>
                </AreaProvider>
              </OrderProvider>
            </AuthProvider>
          </CartProvider>
        </ProductsProvider>
      </Router>
    )
  }
}

export default App;
