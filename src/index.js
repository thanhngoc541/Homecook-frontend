import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import "./css/dish.css";
import "./css/login.css";
import "./css/order.css";
import "./css/cart.css";
import "./css/navbar.css";
import { AppProvider } from "./components/items/context";

import App from "./App";
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
