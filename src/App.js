import { useState, createContext } from "react";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import PrivateLayout from "./common/layouts/PrivateLayout";

import OrderPage from "./components/ orderPage/ OrderPage";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import ProductDetails from "./components/productDetails/ProductDetails";
import AddProduct from "./components/addProduct/AddProduct";
import EditProduct from "./components/editProduct/EditProduct";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const AUTH_STATE = {
  isLoggedIn: false,
  user: null,
};

export const AuthContext = createContext(AUTH_STATE);

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});

function App() {
  const [auth, setAuth] = useState(AUTH_STATE);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ToastContainer theme="colored" />

        <AuthContext.Provider
          value={{
            auth,
            setAuth,
          }}
        >
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route element={<PrivateLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="product/:productId/edit" element={<EditProduct />} />
              <Route path="product/:productId" element={<ProductDetails />} />
              <Route path="product/:productId/order" element={<OrderPage />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
