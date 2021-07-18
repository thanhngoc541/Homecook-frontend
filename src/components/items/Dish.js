import React, { useState } from "react";
import api from "../../api";
import { Col, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { useGlobalContext } from "./context";
import DishDetail from "./DishDetail";
import Swal from "sweetalert2";
import DishForm from "../items/DishForm";

const Dish = ({ dish, handleRemoveDish, key, deleteDish }) => {
  const { addToCart, amount } = useGlobalContext();
  const [isNull, setIsNull] = useState(false);
  const [Dish, setDish] = useState(dish);

  const updateDish = async (tDish) => {
    api.updateDish(tDish).then((res) => {
      if (res.ok) {
        setDish(tDish);
        Swal.fire("Updated!", "Your dish has been updated.", "success");
      }
    });
  };
  if (!dish.ImageURL.startsWith("https"))
    dish.ImageURL =
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg";

  if (isNull) return null;
  else
    return (
      <Col key={key} sm={6} lg={3} className="mb-3">
        <Fade in>
          <Card>
            <Popup
              trigger={
                <CardImg
                  top
                  src={Dish.ImageURL}
                  alt={Dish.DishName}
                  className="img-fluid dish-img rounded"
                />
              }
              modal
            >
              {(close) => <DishDetail dish={Dish} close={close} />}
            </Popup>
            <CardBody className="dish-body">
              <CardTitle className="dish-header">
                <h4>{Dish.DishName}</h4>
              </CardTitle>
              <CardText className="dish-price">${Dish.Price}</CardText>
              <CardText className="dish-description">
                {`${Dish.Description.substring(0, 50)}...`}
              </CardText>
              <button
                className="btn btn-success"
                onClick={(e) => addToCart(e, Dish)}
              >
                Buy Now
              </button>
            </CardBody>
          </Card>
        </Fade>
      </Col>
    );
};

export default Dish;
