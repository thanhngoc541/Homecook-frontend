import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="order-OrderNav">
      <Navbar color="light" light expand="md">
        <NavbarBrand className="order-navbar-brand" href="/">
          Status
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="order-nav-item">
              <NavLink href="/pending?id='?'">Pending</NavLink>
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
      <Container>
        <Row>
          <Col>
            <div className="order-item">
              <div className="order-d-flex order-align-items-center">
                <h6 xs="8">
                  Burger King <Badge color="secondary"></Badge>
                </h6>
                <p xs="4" className="icon">
                  hi
                </p>
              </div>
              <div className="order-d-flex order-align-items-center">
                <p className="order-small">
                  <i>timestamp</i>
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
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Order;
