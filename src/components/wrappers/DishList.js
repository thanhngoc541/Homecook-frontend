import React from "react";
import { Row } from "reactstrap";
import Dish from "../items/Dish";

const DishList = ({ dishes, MenuID }) => {
  return (
    <div className="container my-3 px-0 mx-auto">
      <h2>Featured Dishes</h2>
      <Row>
        {dishes
          .filter((dish) => dish.IsAvailable)
          .map((dish) => {
            return <Dish dish={dish} MenuID={MenuID} />;
          })}
      </Row>
    </div>
  );
};

export default DishList;
