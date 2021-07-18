import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { useGlobalContext } from "./context";
import api from "../../api/index";

function DishDetail({ dish, close }) {
  const { addToCart } = useGlobalContext();
  let { HomeCookID, DishName, Price, Description, ImageURL } = dish;
  const [cookName, setCookName] = useState("");

  const fetchCookName = async () => {
    const cook = await api.getAccountByID(HomeCookID);
    setCookName(cook.FullName);
  };

  useEffect(() => {
    fetchCookName();
  }, []);

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
          <header className="dish-detail-header">
            <h6>{cookName}</h6>
            <h2>{DishName}</h2>
            <h5 className="dish-price">${Price}</h5>
          </header>
          <div className="dish-detail-body">{Description}</div>
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
