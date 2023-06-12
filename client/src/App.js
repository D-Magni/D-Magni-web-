import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/layouts/Header";
import Homepage from "./components/pages/Homepage";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useSelector } from "react-redux";

import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "axios";

import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Footer from "./components/layouts/Footer";

//Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

//Pages
import Shop from "./components/product/Shop";
import AboutUs from "./components/pages/AboutUs";
import Contact from "./components/pages/Contact";
import DeliveryInfo from "./components/pages/DeliveryInfo";
import Help from "./components/pages/Help";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import Services from "./components/pages/Services";
import TermsCon from "./components/pages/TermsCon";
import SupportPage from "./components/pages/SupportPage";
import Loader from "./components/layouts/Loader";
import { useAlert } from 'react-alert';

function ProtectedRoute({ isAdmin, children, ...rest }) {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const alert = useAlert();

    if (!loading && !isAuthenticated) {
      navigate("/login");
      alert.error('Please login first');
    }

  if (loading) {
    return <Loader />;
  }

  if (isAdmin && (!isAuthenticated || user.role !== "admin")) {
    navigate("/");
    alert.error('You are not authorized to access this page');
  }

  return <>{children}</>;
}


function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const [, setFlutterwaveKey] = useState(``);
  useEffect(() => {
    store.dispatch(loadUser());

    async function getFlutterwaveApiKey() {
      const { data } = await axios.get('/api/v1/flutterwaveapi');
      setFlutterwaveKey(data.flutterwaveApiKey)
    }

    getFlutterwaveApiKey();
  }, []);
  return (
    <Router>
      <div>
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/search/:keyword" element={<Shop />} exact />
        <Route path="/product/:id" element={<ProductDetails />} exact />
        <Route path="/shop" element={<Shop/>}/>


        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ProtectedRoute isAdmin={false}><Shipping/></ProtectedRoute>} />
        <Route path="/order/confirm" element={<ProtectedRoute isAdmin={false}><ConfirmOrder/></ProtectedRoute>} />

         

        <Route path="/login" element={<Login />}  />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} exact />
        <Route path="/password/reset/:token" element={<NewPassword />} exact />


        <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />

        <Route path="/orders/me" element={<ProtectedRoute><ListOrders /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />



        <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrdersList /></ProtectedRoute>} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews /></ProtectedRoute>} />

        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/deliveryinfo" element={<DeliveryInfo/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="termscon" element={<TermsCon/>}/>
        <Route path="/support" element={<SupportPage/>}/>

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
