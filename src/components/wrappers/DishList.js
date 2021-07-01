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

const DishList = ({ dishes }) => {
  return (
    <div className="container my-3 p-0">
      <h2>Featured Dishes</h2>
      <Row>
        {dishes
          .filter((dish) => dish.IsAvailable)
          .map((dish) => {
            return (
              <Col sm={6} lg={4} key={dish.DishId} className="mb-3">
                <Dish dish={dish} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default DishList;
