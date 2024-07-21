import { Outlet } from 'react-router-dom';
import './App.css';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <Outlet />
                <RightSide />
            </div>
        </div>
    );
}

export default App;
