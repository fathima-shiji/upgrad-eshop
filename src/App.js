import { useState, useEffect } from "react";
import {Routes, Route} from "react-router";

import { ToastContainer, } from "react-toastify";
import OrderPage from "./components/ orderPage/ OrderPage";
import Navbar from './common/Navbar';
import Login from './components/login/Login';
import Home from './components/home/Home';
import SignUp from "./components/signUp/SignUp";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ProductDetails from "./components/productDetails/ProductDetails"
import SelectAddress from "./components/selectAddress/SelectAddress";
import ConformOrder from "./components/conformPage/ConformPage";


import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if(token){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }, [])

  
  return (
    <div className="App">
      <ToastContainer theme="colored" />
     <Navbar isLoggedIn={isLoggedIn} />

     <Routes>
     <Route path="/" element={<Home />} />
     <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
     <Route path="signup" element={<SignUp />} />
     <Route path="product/:productId" element={<ProductDetails />} />
     <Route path="product/:productId/order" element={
      <ProtectedRoute isLoggedIn={isLoggedIn}>
      <OrderPage />
      </ProtectedRoute>
      } 
      
      />
     





     </Routes>
    

     
     
     
     
     
    </div>
  );
}

export default App;
