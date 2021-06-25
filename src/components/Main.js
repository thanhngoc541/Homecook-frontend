import React from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from "./items/Footer";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import MenuPage from "./pages/MenuPage";
import Navbar from "./items/NavBar"
import Cart from "./items/Cart";
function Main(props) {
  return (
    <>
      <Navbar />
      <Cart />
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          classNames="page"
          timeout={300}
          exit={false}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/menu/:menuId" component={MenuPage} />
            <Route path="/order" component={Order} />
            <Route path="/setting" component={Setting} />
            <Route path="/login" component={Login} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
}

export default withRouter(Main);
