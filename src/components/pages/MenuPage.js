
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Fade, Stagger } from "react-animation-components";
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import api from "../../api";
import Dish from "../items/Dish";
import {
  Input,
  InputGroup,
  Button,
  Col,
  Navbar,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg,
  Row,
  Media,
} from "reactstrap";
function Menu() {
  var {menuId} = useParams();
  const [menu, setMenu] = useState(null);
  const getMenu = (menuId) => {
    api.getMenuByID(menuId).then((res) => { setMenu(res) });
  }
  useEffect(() => {
    console.log(menuId);
    getMenu(menuId);
    console.log(menu);

  })
  if (menu == null) return <p>loading</p>; else {
    var { menuName, homeCookName, rating, dishes, menuURL, menuDescription } = menu;
    console.log(dishes);
    return (
      <div className="p-3"> 
        <Card className="p-0">
          <CardBody className="row p-0">
            <Col md={1} className="bg-light rounded p-0 mx-auto my-auto" style={{ padding: 'none' }}>
              <CardImg top width="100%" src={menuURL} alt="MenuIMG" />
            </Col>
            <Col md={10} className="mx-3 py-2">
              <CardTitle tag="h2" className="text-dark">
                <strong>{menuName}</strong>
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">{homeCookName}</CardSubtitle>
              <CardText>{menuDescription}</CardText>
              <ReactStars
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              />
            </Col>
          </CardBody>
        </Card>
        <div className="container-fluid my-3">
        <h2>Dishes available</h2>
        <Row>
          {dishes
            .filter((dish) => dish.available)
            .map((dish) => {
              var {dishName,imageURL,price,description}= dish;
              return (
                <Col md={4} key={dish.DishId}>
                <Fade in>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={imageURL}
                    alt={dishName}
                    className="img-fluid dish-img rounded"
                  />
                  <CardBody>
                    <CardTitle className="dish-header">
                      <h3>{dishName}</h3>
                      <h3 className="dish-price">${price}</h3>
                    </CardTitle>
                    <CardText>
                      <span>{description}</span>
                    </CardText>
                  </CardBody>
                </Card>
              </Fade>
              </Col>
              );
            })}
        </Row>
      </div>
      </div>
    );
  }
}

export default Menu;
