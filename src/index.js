import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import Route from "./routes/Route";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Route />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
