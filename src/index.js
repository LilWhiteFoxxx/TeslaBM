import React from 'react';
import ReactDOM from 'react-dom';
import Route from './routes/Route';

// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
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
        {/* </Provider> */}
    </React.StrictMode>
);
