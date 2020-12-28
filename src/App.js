import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// --Pages
import Home from './pages/Client/Home';
import Detail from './pages/Client/Detail';
import Checkout from './pages/Client/Checkout';
import OrderReceived  from './pages/Client/OrderReceived';
import UserProfile from './pages/Client/UserProfile';
import Orders from './pages/Client/Orders';
import AdminLogin from './pages/Admin/AdminLogin';
import Admin from './pages/Admin/Admin';
import Products from './pages/Admin/Products';
import Customers from './pages/Admin/Customers';
import Promotions from './pages/Admin/Promotions';
import AdminOrders from './pages/Admin/Orders';
import NotFound from './pages/404';
// --Contexts
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import { AreaProvider } from './contexts/AreaContext';
import { AdminProvider } from './contexts/AdminContext';
// --Components
import Alert from './components/Alert';
import TopMenu from './components/Client/TopMenu';
import UserRoute from './components/Client/UserRoute';
import AdminRoute from './components/Admin/AdminRoute';
import NavBar from './components/Admin/NavBar';
import ProductFunc from './components/Admin/ProductFunc';
import Promotion from './pages/Client/Promotion';

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
                        <Route path={["/", "product:title", "/checkout", "/order-received/:id", "/profile", "/order", "/promotion/:id"]} render={props => <Alert option="login" />} />
                        <Route exact path={["/admin", "/admin/products", "/admin/orders", "/admin/customers", "/admin/promotions"]} component={NavBar} />
                        <Route exact path={["/admin", "/admin/products", "/admin/orders", "/admin/customers", "/admin/promotions"]} component={ProductFunc} />
                        <Route path="/admin" render={props => <Alert option="admin" isOpen />} />
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/product/:title" location={{state: { id: 1}}} component={Detail} />
                          <Route exact path="/promotion/:id" component={Promotion} />
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
                          <AdminRoute exact path="/admin/promotions" component={Promotions} />
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
