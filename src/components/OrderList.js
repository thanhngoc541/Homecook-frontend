import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from "reactstrap";
  import Items from "./items/OrderItem";
const OrderList = ({orders}) => {
    return (
      <div className="order-OrderNav">
        <Container>
          <Row>
            {orders.map((order) => {
              const {
                OrderID,
                TimeStamp,
                Status,
                Total,
                ReceiverPhone,
                ReceiverAddress,
                ReceiverName,
              } = order;
              return (
                <Col xs="3" key={OrderID}>
            <Card onClick="">
              <CardImg top width="100%" src="https://wallpaperaccess.com/full/1727351.jpg" alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h5">{Status}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{TimeStamp}</CardSubtitle>
                <CardText className="order-text">
                  <span style={{fontSize: "smaller"}}>
                    <div>{ReceiverName}</div>
                    <div>{ReceiverPhone}</div>
                    <div>{ReceiverAddress}</div>
                  </span>
                  <span className="order-total" style={{paddingTop: "16px"}}>{Total}</span>
                </CardText>
                {/* <Button>Cancel</Button> */}
                <Items orderID={OrderID}/>
              </CardBody>
            </Card>
          </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
    //-------------------------
  };
  export default OrderList;