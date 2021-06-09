import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import { Fade, Stagger } from "react-animation-components";

const DishList = () => {
  const url = "/api/hello";

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    const response = await fetch(url);
    const newDishes = await response.json();
    setDishes(newDishes);
    setLoading(false);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  if (loading) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <div className="container-fluid my-3">
      <h2>Featured Dishes</h2>
      <Row>
        {dishes.map((dish) => {
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
            <Col md={4} key={DishId}>
              <Fade in>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={ImageURL}
                    alt={DishId}
                    className="img-fluid menu-dish-img rounded"
                  />
                  <CardBody>
                    <CardTitle>
                      <h3>{DishName}</h3>
                    </CardTitle>
                    <CardText>
                      DishID: {dish.DishId}
                      HomeCookID: {HomeCookID}
                      Price:{Price}
                      IsAvailable:{IsAvailable}
                      Description:{Description}
                    </CardText>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
export default DishList;
