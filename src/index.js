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
import firebase from './firebase';
import { AppProvider } from "./components/items/context";

import App from "./App";
const messaging = firebase.messaging();
messaging.getToken({vapidKey: "BDErFcqqMU2IUe_tJ2rIt5Vu7CyDIm9GtG_Nmk4bR1lfQQK7wPyDtD8EJRysTj5Hd4qF_M2DmDUNileGFAYxBSY"}).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(currentToken)
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
