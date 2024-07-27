//The router

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import ShopPage from '../pages/home/ShopPage';
import TestPage from '../pages/TestPage';
import ProductPage from '../pages/product/ProductPage';
import Cart from '../components/cart/Cart';
import Checkout from '../components/checkoutPage/Checkout';
import Confirmation from '../components/checkoutPage/Confirmation';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Verify from '../pages/auth/Verify';
import ProfilePage from '../pages/profile/Profile';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ProductDetail from '../pages/product/ProductDetail';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import Wallet from '../components/profile/Wallet';
import Bill from '../components/bill/Bill';
import Success from '../pages/checkout/Success';
import Error from '../pages/checkout/Error';
import Invoice from '../components/bill/Invoice';
import MyOrder from '../components/profile/MyOrder';

export default function MyRouter() {
    return (
        <Router>
            <Routes>
                <Route path="groupproject/" element={<App />}>
                    <Route index element={<ShopPage />} />
                    <Route
                        // exact
                        path="/groupproject/category/:productCategory/"
                        element={<ProductPage />}
                    />
                    <Route
                        // exact
                        path="/groupproject/category/:productCategory/:subCategory"
                        element={<ProductPage />}
                    />
                    <Route
                        // exact
                        path="/groupproject/category/:productCategory/:subCategory/:option"
                        element={<ProductPage />}
                    />
                    <Route
                        // exact
                        path="/groupproject/search/:searchValue"
                        element={<TestPage />}
                    />
                    <Route
                        // exact
                        path="/groupproject/checkout"
                        element={<Checkout />}
                    />
                    <Route
                        // exact
                        path="/groupproject/invoicer"
                        element={<Bill />}
                    />
                    <Route
                        // exact
                        path="/groupproject/invoicer/:orderId"
                        element={<Invoice />}
                    />
                    <Route
                        // exact
                        path="/groupproject/checkout/confirm"
                        element={<Confirmation />}
                    />
                    <Route exact path="/groupproject/cart" element={<Cart />} />
                    <Route
                        exact
                        path="/groupproject/product/:slug"
                        element={<ProductDetail />}
                    />
                    <Route
                        exact
                        path="/groupproject/productdetail"
                        element={<ProductDetail />}
                    />
                </Route>
                <Route path="/groupproject/login" element={<Login />} />
                <Route path="/groupproject/signup" element={<SignUp />} />
                <Route path="/groupproject/verify" element={<Verify />} />
                <Route path="/groupproject/profile" element={<ProfilePage />}>
                    <Route index element={<PersonalInfoForm />} />
                    <Route
                        path="/groupproject/profile/wallet"
                        element={<Wallet />}
                    />
                    <Route
                        path="/groupproject/profile/myorders"
                        element={<MyOrder />}
                    />
                </Route>
                <Route
                    path="/groupproject/forgotpassword"
                    element={<ForgotPassword />}
                />
                <Route path="/groupproject/success" element={<Success />} />
                <Route path="/groupproject/error" element={<Error />} />
            </Routes>
        </Router>
    );
}
