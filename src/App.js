import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { checkTokenExpiration } from './app/features/authSlice';
import Nav from './components/navBar/Nav';
import Footer from './components/Footer';

import './App.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkTokenExpiration());
    }, [dispatch]);

    return (
        <div className="App">
            <Nav />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
