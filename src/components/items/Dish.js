import React, { useState } from "react";
import api from "../../api";
import { Col, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { useGlobalContext } from "./context";
import DishDetail from "./DishDetail";
import Swal from "sweetalert2";

const Dish = ({ dish, MenuID }) => {
  const { addToCart } = useGlobalContext();
  const [isNull, setIsNull] = useState(false);

  const handleAddCart = (e) => {
    addToCart(e, dish);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your dish has been added",
      showConfirmButton: false,
      timer: 1500,
    });
  };

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
  if (!ImageURL.startsWith("https"))
    ImageURL =
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg";
  if (isNull) return null;
  else
    return (
      <Col sm={6} lg={3} key={dish.DishId} className="mb-3">
        <Fade in>
          <Card>
            <Popup
              trigger={
                <CardImg
                  top
                  src={ImageURL}
                  alt={DishName}
                  className="img-fluid dish-img rounded"
                />
              }
              modal
            >
              {(close) => <DishDetail dish={dish} close={close} />}
            </Popup>

            <CardBody className="dish-body">
              <CardTitle className="dish-header">
                <h4>{DishName}</h4>'<h4 className="dish-price">${Price}</h4>'
              </CardTitle>
              <CardText>
                <p>
                  {`${Description.substring(0, 50)}...`}
                  <Popup
                    trigger={<button className="see-more">See more</button>}
                    modal
                  >
                    {(close) => <DishDetail dish={dish} close={close} />}
                  </Popup>
                </p>
              </CardText>
              <button
                className="btn btn-success"
                onClick={(e) => handleAddCart(e)}
              >
                Add To Cart
              </button>
              {MenuID != null ? (
                <button
                  className="btn btn-primary float-right"
                  onClick={() => {
                    api.removeDishFromMenu(DishId, MenuID);
                    setIsNull(true);
                  }}
                >
                  Remove
                </button>
              ) : null}
            </CardBody>
          </Card>
        </Fade>
      </Col>
    );
};

export default Dish;
