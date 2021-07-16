import React from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import Footer from "./items/Footer";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import MenuDetail from "./pages/MenuDetail";
import NavBar from "./items/NavBar";
import Cart from "./items/Cart";
import HomeCookPage from "./pages/HomeCook_DIsh";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Register from "./pages/Register";
import "../css/checkout.css";
import "../css/statusbar.css";
import "../css/orderlist.css";
import NavBarDashBoard from "./items/NavBarDashBoard";
import HomeCookDashBoard from "./items/HomeCook_Page.js";
import Dashboard from "./items/DashboardLanding";
import DishesPage from "./pages/DishesPage";
import MenuPage from "./pages/MenuPage";
import AccountInfo from "./pages/AccountInfo";
import SidebarHome from "./items/SidebarHome";
function Main(props) {
  const Homepage = () => {
    return (
      <>
        <NavBar />
        <Cart />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mr-auto px-auto">
            <Home />
          </Col>
        </Row>
        <Footer />
      </>
    );
  };
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
        {/* <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <HomeCookPage />
          </Col>
        </Row> */}
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
  const SettingPage = () => {
    return (
      <>
        <NavBar />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <Setting />
          </Col>
        </Row>
      </>
    );
  };
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
        <Footer />
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
        <Footer />
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
            <Route path="/order" component={OrderPageMain} />
            <Route path="/setting" component={SettingPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={RegisterPage} />
            <Route path="/dishes" component={DishesPageMain} />
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
