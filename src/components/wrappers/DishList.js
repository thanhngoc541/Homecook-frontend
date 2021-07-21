import React from "react";
import { Row } from "reactstrap";
import Dish from "../items/Dish";

const DishList = ({ isMenu, dishes, handleRemoveDish ,deleteDish}) => {
  console.log(dishes);
  return (
    <div className="container my-3 px-0 mx-auto">
      <Row>
        {dishes
          .map((dish) => {
            return <Dish isMenu={isMenu} deleteDish={deleteDish} key={dish.DishID} dish={dish} handleRemoveDish={handleRemoveDish} />;
          })}
      </Row>
    </div>
  );
};

export default DishList;
