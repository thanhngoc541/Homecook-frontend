import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.min.css";
import "./css/sidebarhome.css"
import "./index.css";
import "./css/loginpage.css";
import "./css/util.css";
import "./css/register.css";
import "./css/dish.css";
import "./css/dishdetail.css";
import "./css/navbar.css";
import "./css/order.css";
import "./css/cart.css";
import "./css/dashboard.css";
import "./css/chart.css";
import "./css/dashboardhome.css";
import "./css/featuredinfo.css";
import "./css/navbaradmin.css";
import "./css/checkout.css";
import "./css/statusbar.css";
import "./css/orderlist.css";
import "./css/checkout.css";
import "./css/button.css";
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
