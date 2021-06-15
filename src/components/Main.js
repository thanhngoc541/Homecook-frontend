import React from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from "./Footer";
import Home from "./Home";
import Order from "./Order";
import Setting from "./Setting";
import Login from "./Login";
import MenuPage from "./MenuPage";
import SideBar from "./SideBar";

function Main(props) {
  return (
    <>
      <Row>
        <Col md={1}>
          <SideBar />
        </Col>

        <Col md={11}>
          <TransitionGroup>
            <CSSTransition
              key={props.location.key}
              classNames="page"
              timeout={300}
              exit={false}
            >
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/menu" component={MenuPage} />
                <Route path="/order" component={Order} />
                <Route path="/setting" component={Setting} />
                <Route path="/login" component={Login} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </Col>
      </Row>
    </>
  );
}

export default withRouter(Main);
