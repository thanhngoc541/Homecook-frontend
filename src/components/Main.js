import React from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from "./items/Footer";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import MenuDetail from "./pages/MenuDetail";
import NavBar from "./items/NavBar";
import Cart from "./items/Cart";
import MenuPage from "./pages/MenuPage";
function Main(props) {
  return (
    <>
      <NavBar />
      <Cart />
      <Row>
        <Col md={{size: 8, offset: 2}}>
          <TransitionGroup>
            <CSSTransition
              key={props.location.key}
              classNames="page"
              timeout={300}
              exit={false}
            >
              <Switch location={props.location}>
                <Route path="/home" component={Home} />
                <Route path="/menu/:menuId" exact component={MenuDetail} />
                <Route
                  path="/menu/homecook/:homeCookId"
                  exact
                  component={MenuPage}
                />
                <Route path="/order" component={Order} />
                <Route path="/setting" component={Setting} />
                <Route path="/login" component={Login} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Col>
      </Row>

      <Footer />
    </>
  );
}

export default withRouter(Main);
