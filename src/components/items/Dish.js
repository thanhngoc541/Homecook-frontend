import React, { useState } from "react";
import api from "../../api";
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

const Dish = ({ dish, MenuID }) => {
  const { addToCart } = useGlobalContext();
  const [readMore, setReadMore] = useState(false);

  if (!dish.ImageURL.startsWith("https"))
    dish.ImageURL =
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg";
  let {
    DishId,
    HomeCookID,
    DishName,
    Price,
    IsAvailable,
    Description,
    ImageURL,
  } = dish;
  const [isNull, setIsNull] = useState(false);
  if (!ImageURL.startsWith("https")) ImageURL =
    "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg";
  if (isNull) return null; else
    return (
      <Col sm={6} lg={3} key={dish.DishId} className="mb-3">
        <Fade in>

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
                  {readMore
                    ? Description
                    : `${Description.substring(0, 50)}...`}
                  <button
                    className="see-more"
                    onClick={(e) => {
                      e.preventDefault();
                      setReadMore(!readMore);
                    }}
                  >
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
              {MenuID != null ?


                <button onClick={() => {
                  api.removeDishFromMenu(DishId, MenuID);
                  setIsNull(true);
                }}
                  class="btn btn-outline-danger btn-lg rounded border-0 float-right
                "
                  type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>

                : null}
            </CardBody>
          </Card>
          {/* </Link> */}
        </Fade>
      </Col>
    );
};

export default Dish;
