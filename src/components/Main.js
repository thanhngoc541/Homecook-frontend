import React from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import {

  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import Footer from "./items/Footer";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import MenuDetail from "./pages/MenuDetail";
import NavBar from "./items/NavBar";
import Cart from "./items/Cart";

import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

import Register from "./pages/Register";
import "../css/checkout.css";
import "../css/statusbar.css";
import "../css/orderlist.css";

import HomeCookDashBoard from "./items/HomeCook_Page.js";
import Dashboard from "./items/DashboardLanding";
import DishesPage from "./pages/DishesPage";
import MenuPage from "./pages/MenuPage";
import AccountInfo from "./pages/AccountInfo";
function Main(props) {
  const Homepage = () => {
    
    return (
      <>
        <NavBar />
        <Cart />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <Home />
          </Col>
        </Row>
        <Footer />
      </>
    );
  };
  const AdminDashBoard = () => {
    return (
      <>
        <NavBar />
        <Row className="my-3">
          <Dashboard />
        </Row>
        
      </>
    )
  }

  const MenuDetailpage = () => {
    return (
      <>
        <NavBar />
        <Cart />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <MenuDetail />
          </Col>
        </Row>
        <Footer />
      </>
    );
  };
  const MenuPageMain = () => {
    return (
      <>
        <NavBar />
        <HomeCookDashBoard></HomeCookDashBoard>
      </>
    );
  };
  const CheckoutPage = () => {
    return (
      <>
        <NavBar />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <Checkout />
          </Col>
        </Row>
        <Footer />
      </>
    );
  };
  const OrderPageMain = () => {
    return (
      <>
        <NavBar />
        <Cart />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <OrderPage />
          </Col>
        </Row>
        <Footer />
      </>

    );
  };
  const AccountInformation = () => {
    return (
      <>
        <NavBar />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <AccountInfo />
          </Col>
        </Row>
        <Footer />
      </>

    );
  }

  const MenusPageMain = () => {
    return (
      <>
        <NavBar />
        <Cart />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <MenuPage />
          </Col>
        </Row>

      </>
    );
  };


  const DishesPageMain = () => {
    return (
      <>
        <NavBar />
        <Cart />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <DishesPage />
          </Col>
        </Row>

      </>
    );
  };

  const LoginPage = () => {
    return (
      <>
        <NavBar />
        <Login />
        <Footer />
      </>
    );
  };

  const RegisterPage = () => (
    <>
      <NavBar />
      <Register />
      <Footer />
    </>
  );
  return (
    <>
      <SwitchTransition>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch location={props.location}>
            <Route path="/home" component={Homepage} />
            <Route path="/menu/:menuId" exact component={MenuDetailpage} />
            <Route path="/homecook" exact component={MenuPageMain} />
            <Route path="/checkout" component={CheckoutPage} />
            
            <Route path="/dishes/:name" exact component={DishesPageMain} />
            <Route path="/order" component={OrderPageMain} />
            <Route path="/dashboard" component={AdminDashBoard} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={RegisterPage} />
            <Route path="/dishes" component={DishesPageMain} />
            <Route path="/menus/:name" exact component={MenusPageMain} />
            <Route path="/menus" component={MenusPageMain} />
            
            
            <Route path="/account" component={AccountInformation} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default withRouter(Main);
