import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  Button,
  Col,
  Navbar,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Media,
} from "reactstrap";
export default function Menu(props) {

  return (
    <CardBody className="row p-2">
                    <Col md={2} className="bg-light rounded p-3 mx-3">
                      <CardImg
                        width="100%"
                        src="assests/images/burgerking.png"
                        alt="demo"
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={{ size: "auto" }} className="mx-3 py-2">
                      <CardTitle>
                        <strong>{props.menuName}</strong>
                      </CardTitle>
                      <CardText className="small">
                        <i
                          className="fa fa-star text-warning mr-1"
                          aria-hidden="true"
                        ></i>
                        <span>0.8</span> (873)
                        <i
                          className="fa fa-usd ml-3 mr-1 text-success"
                          aria-hidden="true"
                        ></i>
                        <span>6.2</span>
                      </CardText>
                    </Col>
                  </CardBody>
  );
}
