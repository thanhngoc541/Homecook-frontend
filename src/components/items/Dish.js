import React, { useState } from "react";
import { Col, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Fade } from "react-animation-components";
import Popup from "reactjs-popup";
import { useGlobalContext } from "./context";
import DishDetail from "./DishDetail";
import ReactStars from "react-rating-stars-component";

const Dish = ({ isMenu, dish, key }) => {
  const { addToCart } = useGlobalContext();
  const [isNull, setIsNull] = useState(false);
  const [Dish, setDish] = useState(dish);

  if (!dish.ImageURL.startsWith("https"))
    dish.ImageURL =
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg";

  if (isNull) return null;
  else
    return (
      <Col key={key} sm={6} md={4} className="mb-3">
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
              <ReactStars
              count={5}
              value={Dish.Rating}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
              <CardText className="dish-price">${Dish.Price}</CardText>
              <CardText className="dish-description">
                {`${Dish.Description.substring(0, 50)}...`}
              </CardText>
              <CardText className="">{Dish.Servings} people</CardText>
              {isMenu ? null : <button
                className="btn btn-success float-right"
                onClick={(e) => {addToCart(e,dish)}}
              >
                Buy Now
              </button>}
            </CardBody>
          </Card>
        </Fade>
      </Col>
    );
};

export default Dish;
