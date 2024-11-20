import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./font/all.min.css";
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { BrowserRouter as Router , RouterProvider } from "react-router-dom";
import store  from "./Redux/store.js";
import {Provider} from 'react-redux'
import router from "./Router/router.jsx";




ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
      
    </RouterProvider>
  </Provider>
);
