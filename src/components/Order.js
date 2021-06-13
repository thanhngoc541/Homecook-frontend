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
import { OrderItem } from './OrderItem';

const url = "http://localhost:8080/Homecook_war_exploded/orders/customer/7";
function Order() {
  const [orders, setOrders] = useState(orderData);
  const [showOrderItem, setShowOrderItem] = useState(false);

  const openOrderItem = () => {
    setShowOrderItem(prev => !prev);
  }

  const StatusBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
      const response = await fetch(url);
      const orders = await response.json();
      console.log(orders);
    }
    useEffect(() => {
      fetchOrders();
    }, []);

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

  const Order = ({ OrderID, TimeStamp, StatusID, Note, Total, ReceiverPhone, ReceiverAddress, ReceiverName }) => {
    return (
      <div className="order-OrderNav">
        <Container>
          <Row>
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
                  <span className="order-mr-2 order-text-black">{ReceiverName}{ReceiverPhone}{ReceiverAddress}</span>
                  <span></span>
                </p>
                <p className="order-text-dark order-mb-2">
                  <span className="order-mr-2 order-text-black">{Note}{Total}</span>
                  <span></span>
                </p>
                <div className="order-d-flex order-align-items-center order-row order-pt-2 order-mt-3">
                  <Button onClick={openOrderItem}
                    className="order-btn order-btn-block order-btn-primary"
                    color="info">
                    Info
                  </Button>{" "}
                  <showOrderItem showOrderItem={showOrderItem} setShowOrderItem= {setShowOrderItem}/>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const Orders = ({ orders }) => {
    return (
      <section>
        <div>
          {orders.map((order) => {
            return <Order key={order.OrderID} {...order}></Order>;
          })}
        </div>
      </section>
    );
  };
  return (
    <div className="bg-grey">
      <StatusBar />
      <Orders />
    </div>
  );
}
export default Order;

