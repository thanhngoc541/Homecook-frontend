import React from "react";
import { Row } from "reactstrap";
import Dish from "../items/Dish";

const DishList = ({ dishes, handleRemoveDish }) => {
  return (
    <div className="container my-3 px-0 mx-auto">
      
      <Row>
        {dishes
          .filter((dish) => dish.IsAvailable)
          .map((dish) => {
            return <Dish key={dish.DishID} dish={dish} handleRemoveDish={handleRemoveDish} />;
          })}
      </Row>
    </div>
  );
};

export default DishList;
