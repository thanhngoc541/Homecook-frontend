import React, { useEffect, useState } from "react";
import Loading from './Loading';
import orderData from '../orderData.js';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Button,
  Badge,
} from "reactstrap";
function Order() {
  const [orders, setOrders] = useState(orderData);

  const StatusBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand className="order-navbar-brand" href="/">
          Status
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="order-nav-item">
              <NavLink href="/pending">Pending</NavLink>
            </NavItem>
            <NavItem className="order-nav-item">
              <NavLink href="/accept">Accepted</NavLink>
            </NavItem>
            <NavItem className="order-nav-item">
              <NavLink href="/delivering">Delivering</NavLink>
            </NavItem>
            <NavItem className="order-nav-item">
              <NavLink href="/delivered">Delivered</NavLink>
            </NavItem>
            <NavItem className="order-nav-item">
              <NavLink href="/finished">Finished</NavLink>
            </NavItem>
            <NavItem className="order-nav-item">
              <NavLink href="/rejected">Rejected</NavLink>
            </NavItem>
            <NavItem className="order-nav-item">
              <NavLink href="/cancelled">Cancelled</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  const OrderList = () => {
    return (
      <div className="order-OrderNav">
        <Container>
          <Row>
            {orders.map((order) => {
              const {
                OrderID,
                TimeStamp,
                StatusID,
                Note,
                Total,
                ReceiverPhone,
                ReceiverAddress,
                ReceiverName,
              } = order;
            return (
            <Col xs="3" key={OrderID}>
              <div className="order-item">
                <div className="order-d-flex order-align-items-center">
                  <h6 xs="8" className="homecook">
                    {OrderID}<Badge color="secondary"></Badge>
                  </h6>
                  <p xs="4" className="icon">
                    {StatusID}
                </p>
                </div>
                <div className="order-d-flex order-align-items-center">
                  <p className="order-small">
                    <i>{TimeStamp}</i>
                  </p>
                </div>
                <p className="order-text-dark order-mb-2">
                  <span className="order-mr-2 order-text-black">1</span>
                  <span> Burger</span>
                </p>
                <p className="order-text-dark order-mb-2">
                  <span className="order-mr-2 order-text-black">2</span>
                  <span> Cheese</span>
                </p>
                <div className="order-d-flex order-align-items-center order-row order-pt-2 order-mt-3">
                  <Button
                    className="order-btn order-btn-block order-btn-primary"
                    color="info"
                  >
                    info
                </Button>{" "}
                </div>
              </div>
            </Col>
            );
            })}
          </Row>
        </Container>
      </div>
    );
  };
  return (
    <div className="bg-grey">
      <StatusBar />
      <OrderList />
    </div>
  );
}
export default Order;

