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

const Dish = ({ dish }) => {
  const {
    DishId,
    HomeCookID,
    DishName,
    Price,
    IsAvailable,
    Description,
    ImageURL,
  } = dish;
  return (
    <Fade in>
      <Link to={`/menu/`}>
        <Card>
          <CardImg
            top
            width="100%"
            src={ImageURL}
            alt={DishName}
            className="img-fluid dish-img rounded"
          />
          <CardBody>
            <CardTitle className="dish-header">
              <h4>{DishName}</h4>
              <h4 className="dish-price">${Price}</h4>
            </CardTitle>
            <CardText>
              <span>{Description}</span>
            </CardText>
            <Button>Add To Cart</Button>
          </CardBody>
        </Card>
      </Link>
    </Fade>
  );
};

export default Dish;
