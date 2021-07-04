import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { useGlobalContext } from "./context";
import Popup from "reactjs-popup";

function DishDetail({ dish, close }) {
  const { addToCart } = useGlobalContext();

  let {
    DishId,
    HomeCookID,
    DishName,
    Price,
    IsAvailable,
    Description,
    ImageURL,
  } = dish;

  return (
    <Row>
      <Col
        lg={{ size: 8, offset: 2 }}
        className="mx-auto row dish-detail-container"
      >
        <Col lg={5}>
          <img
            top
            src={ImageURL}
            alt={DishName}
            className="img-fluid dish-img rounded"
          />
        </Col>
        <Col lg={{ size: 7 }}>
          <header className='dish-detail-header'>
            <h3>{DishName}</h3>
            <h4>{HomeCookID}</h4>
            <h5 className="dish-price">${Price}</h5>
          </header>
          <div className='dish-detail-body'>{Description}</div>
          <footer>
            <Button color="success" onClick={(e) => addToCart(e, dish)}>
              Add to cart
            </Button>{" "}
            <Button color="secondary" onClick={() => close()}>
              Cancel
            </Button>
          </footer>
        </Col>
      </Col>
    </Row>
  );
}

export default DishDetail;
