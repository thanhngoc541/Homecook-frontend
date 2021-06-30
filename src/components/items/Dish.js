import React, { useState } from "react";
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
import { useGlobalContext } from "./context";

const Dish = ({ dish }) => {
  const { addToCart } = useGlobalContext();
  const [readMore, setReadMore] = useState(false);

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
            src={ImageURL}
            alt={DishName}
            className="img-fluid dish-img rounded"
          />
          <CardBody className="dish-body">
            <CardTitle className="dish-header">
              <h4>{DishName}</h4>
              <h4 className="dish-price">${Price}</h4>
            </CardTitle>
            <CardText>
              <p>
                {readMore ? Description : `${Description.substring(0, 100)}...`}
                <button className="see-more" onClick={(e) => {
                  e.preventDefault();
                  setReadMore(!readMore)
                }}>
                  {readMore ? "show less" : "see more"}
                </button>
              </p>
            </CardText>
            <button
              className="btn btn-primary"
              onClick={(e) => addToCart(e, dish)}
            >
              Add To Cart
            </button>
          </CardBody>
        </Card>
      </Link>
    </Fade>
  );
};

export default Dish;
