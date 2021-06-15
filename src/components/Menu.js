import React from "react";
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
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";

const Menu = ({ menu }) => {
  const { UserID, UserName, rating } = menu;
  return (
    <Fade in>
      <Link to={`/restaurant/{UserID}`}>
        <Card className="p-0">
          <CardBody className="row p-2">
            <Col md={2} className="bg-light rounded p-3 mx-3">
              <CardImg
                width="100%"
                src="assests/images/burgerking.png"
                alt="{UserName}"
                className="img-fluid"
              />
            </Col>
            <Col md={{ size: "auto" }} className="mx-3 py-2">
              <CardTitle className="text-dark">
                <strong>{UserName}</strong>
              </CardTitle>
              <CardText className="small  text-dark">
                <span>{rating}</span>
                <i
                  className="fa fa-star text-warning ml-1"
                  aria-hidden="true"
                ></i>
              </CardText>
            </Col>
          </CardBody>
        </Card>
      </Link>
    </Fade>
  );
};
export default Menu;
