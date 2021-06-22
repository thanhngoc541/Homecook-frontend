import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
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
  CardSubtitle,
  CardImg,
  Row,
  Media,
} from "reactstrap";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import '../../css/utilities.css'
const Menu = (props) => {
  if (props == null) return null;
  const { menuID,menuName, homeCookName, rating, menuURL, menuDescription } = props;

  return (
    <Fade in>
      <Link to={`/menu/${menuID}`}>
        <Card className="p-0">
          <CardBody className="row p-2">
            <Col md={3} className="bg-light rounded npadding mx-3" style={{ padding: 'none' }}>
              <CardImg top width="100%" src={menuURL} alt="MenuIMG" />
            </Col>
            <Col md={{ size: "auto" }} className="mx-3 py-2">
              <CardTitle className="text-dark">
                <strong>{menuName}</strong>
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">{homeCookName}</CardSubtitle>
              <ReactStars
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              />
            </Col>
          </CardBody>
        </Card>
        </Link>
      </Fade>
  );
};
export default Menu;
