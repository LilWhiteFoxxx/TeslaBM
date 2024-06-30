//The router

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import ShopPage from "../pages/home/ShopPage";
import TestPage from "../pages/TestPage";
import ProductPage from "../pages/product/ProductPage";
import Cart from "../components/cart/Cart";
import Checkout from "../components/checkoutPage/Checkout";
import Confirmation from "../components/checkoutPage/Confirmation";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Verify from "../pages/auth/Verify";

export default function MyRouter() {
  return (
    <Router>
      <Routes>
        <Route path='groupproject/' element={<App />}>
          <Route index element={<ShopPage />} />
          <Route
            // exact
            path='/groupproject/category/:productCategory/'
            element={<ProductPage />}
          />
          <Route
            // exact
            path='/groupproject/category/:productCategory/:subCategory'
            element={<ProductPage />}
          />
          <Route
            // exact
            path='/groupproject/category/:productCategory/:subCategory/:option'
            element={<ProductPage />}
          />
          <Route
            // exact
            path='/groupproject/search/:searchValue'
            element={<TestPage />}
          />
          <Route
            // exact
            path='/groupproject/checkout'
            element={<Checkout />}
          />
          <Route
            // exact
            path='/groupproject/checkout/confirm'
            element={<Confirmation />}
          />
          <Route exact path='/groupproject/cart' element={<Cart />} />
        </Route>
        <Route path="/groupproject/login" element={<Login/>}/>
        <Route path="/groupproject/signup" element={<SignUp/>}/>
        <Route path="/groupproject/verify" element={<Verify/>}/>
      </Routes>
    </Router>
  );
}
