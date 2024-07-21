import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import MainDash from '../pages/MainDash/MainDash';

export default function MyRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<MainDash />} />
                </Route>
            </Routes>
        </Router>
    );
}
