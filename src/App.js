import { Outlet } from 'react-router-dom';
// import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

import './App.css';

function App() {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <Outlet />
                {/* <RightSide /> */}
            </div>
        </div>
    );
}

export default App;
