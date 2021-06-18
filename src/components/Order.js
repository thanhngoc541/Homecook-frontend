import React, { useEffect, useState } from "react";
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
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from "reactstrap";
import Items from "./OrderItem";
function Order() {

  const StatusBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
      <Navbar color="light" light expand="md" className="bg-grey">
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
    const url = "http://localhost:8080/Homecook_war_exploded/orders/customer/535340B1-8053-4819-8772-488577A10639";


    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
      const response = await fetch(url);
      const newOrder = await response.json();
      setOrders(newOrder);
      setLoading(false);
    }
    useEffect(() => {
      fetchOrders();
    }, []);
    if (loading) {
      return (
        <setion>
          <h1>Loading...</h1>
        </setion>
      )
    }
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
            <Card>
              <CardImg top width="100%" src="https://wallpaperaccess.com/full/1727351.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h5">{StatusID}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{TimeStamp}</CardSubtitle>
                <CardText className="order-text">
                  <span style={{fontSize: "smaller"}}>
                    <div>{ReceiverName}</div>
                    <div>{ReceiverPhone}</div>
                    <div>{ReceiverAddress}</div>
                  </span>
                  <span className="order-total" style={{paddingTop: "16px"}}>{Total}</span>
                </CardText>
                <Items />
              </CardBody>
            </Card>
          </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  };
  return (
    <div>
      <StatusBar />
      <OrderList />
    </div>
  );
};
export default Order;

