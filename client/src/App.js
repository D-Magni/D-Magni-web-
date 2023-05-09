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

//Admin Imports
import Dashboard from "./components/admin/Dashboard";

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


        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path='/order/confirm' element={<ConfirmOrder/>}/>

        <Route path="/product/:id" element={<ProductDetails />} exact />
        <Route path="/search/:keyword" element={<Homepage />} exact />
        <Route path="/dashboard" element={<Dashboard/>} exact/>

      </Routes>

    </Router>
  );
}

export default App;
