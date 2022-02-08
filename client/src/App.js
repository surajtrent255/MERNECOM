
import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import axios from "axios"
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userAction';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdataProfile from './components/user/UpdataProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProducts';
import ProductsList from './components/admin/ProductsList';
import OrdersList from './components/admin/OrdersList';
import UsersList from './components/admin/UsersList';
import ProductReviews from './components/admin/ProductReviews';
import ErrorPage from './components/ErrorPage';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateUser from './components/admin/UpdateUser';
import ProcessOrder from './components/admin/ProcessOrder';

function App() {


  const [stripeApiKey, setStripeApiKey] = useState('');


  useEffect(() => {
    const datUser = store.dispatch(loadUser())
    async function getStripApiKey() {
      const { data } = await axios.get('http://localhost:4000/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();
  })


  return (
    <Router>

      <div className="App">

        <Header />
        <div className=" container">
          <Routes>

            <Route path="/" element={<Home />} exact />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/product/:id" element={<ProductDetails />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route element={<ProtectedRoute isUser={true} />}>
              <Route exact path="/shipping" element={<Shipping />} />
              <Route exact path='/me' element={<Profile />} />
              <Route exact path="/order/confirm" element={<ConfirmOrder />} />
              <Route exact path="/payment" element={<Payment />} />
              <Route path="/success" element={<OrderSuccess />} exact />
              <Route path="/orders/me" element={<ListOrders />} exact />
              <Route path="/order/:id" element={<OrderDetails />} exact />
              <Route exact path='/me/update' element={<UpdataProfile />} />
              <Route exact path="/password/update" element={<UpdatePassword />} />
            </Route>

            <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route exact path="/dashboard" element={<Dashboard />} exact />
              <Route path="/admin/product" element={<NewProduct />} exact />
              <Route path="/admin/products" element={<ProductsList />} exact />
              <Route path="/admin/product/:id" element={<UpdateProduct />} exact />
              <Route path="/admin/orders" element={<OrdersList />} exact />
              <Route path="/admin/users" element={<UsersList />} exact />
              <Route path="/admin/user/:id" element={<UpdateUser />} exact />
              <Route path="/admin/order/:id" element={<ProcessOrder />} exact />
              <Route path="/admin/reviews" element={<ProductReviews />} exact />
              <Route path="*" element={<ErrorPage />} exact />
            </Route>



          </Routes>
          <Footer />
          {/* <Home/> */}
        </div>
      </div>

    </Router>

  );
}

export default App;
/**
 * React Router is a standard library for routing in React. 
 * It enables the navigation among views of various components in a React Application,
 *  allows changing the browser URL, and keeps the UI in sync with the URL.
 */


/**Route is the conditionally shown component that renders some UI when its path matches the current URL.
 *  Link: Link component is used to create links to different routes and implement navigation around the application.
 *  It works like HTML anchor tag */







