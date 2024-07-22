import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../App';
import MainDash from '../pages/MainDash/MainDash';
import OrderPage from '../pages/order/Order';
import CategoryPage from '../pages/category/Category';
import MotorPage from '../pages/motor/Motor';
import AccessoriesPage from '../pages/accessories/Accessories';
import CustomerPage from '../pages/customer/Customer';

export default function MyRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<MainDash />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/motors" element={<MotorPage />} />
                    <Route path="/accessories" element={<AccessoriesPage />} />
                    <Route path="/customers" element={<CustomerPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
