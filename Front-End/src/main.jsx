import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./font/all.min.css";
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <App />
    </Router>
);
