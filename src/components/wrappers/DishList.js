import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import api from "../../api/index";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Dish from "../items/Dish";

const DishList = ({ dishes,MenuID }) => {
  return (
    <div className="container my-3 px-0 mx-auto">
      
      <Row>
        {dishes
          .filter((dish) => dish.IsAvailable)
          .map((dish) => {
            return (
              
                <Dish dish={dish} MenuID={MenuID}/>
            
            );
          })}
      </Row>
    </div>
  );
};

export default DishList;
