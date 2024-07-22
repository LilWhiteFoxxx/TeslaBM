import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import Route from './routes/Route';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <Route />
        {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            /> */}
        </Provider>
    </React.StrictMode>
);
