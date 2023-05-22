import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Homepage from "./components/pages/Homepage";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import Footer from "./components/layouts/Footer";

//Admin Imports
import Dashboard from "./components/admin/Dashboard";
import Success from "./components/cart/Success";
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
import Shop from "./components/product/Shop";
import AboutUs from "./components/pages/AboutUs";
import Contact from "./components/pages/Contact";
import DeliveryInfo from "./components/pages/DeliveryInfo";
import Help from "./components/pages/Help";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import Services from "./components/pages/Services";
import TermsCon from "./components/pages/TermsCon";
import SupportPage from "./components/pages/SupportPage";

function App() {

  const [flutterwaveApiKey, setFlutterwaveKey] = useState(``);
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
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        {/* <Route path="/me" element={<ProtectedRoute element={<Profile />} />} /> */}
        {/* <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile />} />} exact /> */}
        <Route path="/me" element={<Profile />} exact />
        <Route path="/me/update" element={<UpdateProfile />} exact />
        <Route path="/password/update" element={<UpdatePassword />} exact />
        <Route path="/password/forgot" element={<ForgotPassword />} exact />
        <Route path="/password/reset/:token" element={<NewPassword />} exact />
        <Route path="/success" element={<Success />} />
        <Route path="/orders/me" element={<ListOrders/>}/>
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path='/order/confirm' element={<ConfirmOrder/>}/>
        <Route path="/order/:id" element={<OrderDetails/>} exact/>
         
        <Route path="/product/:id" element={<ProductDetails />} exact />
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/shop/search/:keyword" element={<Homepage />} exact />
        <Route path="/dashboard" element={<Dashboard/>} exact/>
        <Route path="/admin/products" element={<ProductList/>}/>
        <Route path="/admin/product" element={<NewProduct/>}/>
        <Route path="/admin/product/:id" element={<UpdateProduct/>}/> 
        <Route path="/admin/orders" element={<OrdersList/>}/>
        <Route path="/admin/order/:id" element={<ProcessOrder/>}/>
        <Route path="/admin/users" element={<UsersList/>}/>
        <Route path="/admin/user/:id" element={<UpdateUser/>}/>
        <Route path="/admin/reviews" element={<ProductReviews/>}/>

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
