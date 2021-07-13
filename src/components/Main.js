import React from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from "./items/Footer";
import Home from "./pages/Home";
import Order from "./pages/Order";
import MenuDetail from "./pages/MenuDetail";
import NavBar from "./items/NavBar";
import Cart from "./items/Cart";
import HomeCookPage from "./pages/HomeCookPage";
import Checkout from "./pages/Checkout";
import NavBarDashBoard from "./items/NavBarDashBoard";
import Dashboard from "./items/DashboardLanding";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Register from "./pages/Register";
import '../css/checkout.css';
import '../css/statusbar.css';
import '../css/orderlist.css';
import NavBarDashBoard from "./items/NavBarDashBoard";
import Dashboard from "./items/DashboardLanding";
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
      </>
    );
  };
  const MenuPageMain = () => {
    return (
      <>
        <NavBar />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <HomeCookPage />
          </Col>
        </Row>
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
      </>
    );
  };
  const OrderPage = () => {
    return (
      <>
        <NavBar />
        <Row className="mr-0">
          <Col md={{ size: 9, offset: 1 }} className="mx-auto px-auto">
            <Order />
          </Col>
        </Row>
      </>
    );
  };

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
  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          classNames="page"
          timeout={300}
          exit={false}
        >
          <Switch location={props.location}>
            <Route path="/home" component={Homepage} />
            <Route path="/menu/:menuId" exact component={MenuDetailpage} />
            <Route
              path="/homecook/:HomeCookID"
              exact
              component={MenuPageMain}
            />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/order" component={OrderPage} />
            <Route path="/setting" component={SettingPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
}

export default withRouter(Main);
