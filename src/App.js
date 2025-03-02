import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router";
import { ToastContainer, } from "react-toastify";

import AuthLayout from "./components/layouts/AuthLayout";
import OrderPage from "./components/ orderPage/ OrderPage";
import Navbar from './common/Navbar';
import Login from './components/login/Login';
import Home from './components/home/Home';
import SignUp from "./components/signUp/SignUp";
import "react-toastify/dist/ReactToastify.css";


import ProductDetails from "./components/productDetails/ProductDetails"
import SelectAddress from "./components/selectAddress/SelectAddress";
import ConformOrder from "./components/conformPage/ConformPage";


import './App.css';

const AUTH_STATE = {
  isLoggedIn: false,
  user: null
}

export const AuthContext = createContext(AUTH_STATE)

function App() {
  const [auth, setAuth] = useState(AUTH_STATE);


  return (
    <div className="App">
      <ToastContainer theme="colored" />
      
      <AuthContext.Provider value={{
          auth, setAuth
        }}>
        <Navbar />
      <Routes>
          <Route path="login" element={<Login  />} />
          <Route path="signup" element={<SignUp />} />

          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="product/:productId/order" element={<OrderPage/>} />
          </Route>
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}


export default App;
