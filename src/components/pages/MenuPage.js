
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import api from "../../api";
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
    return (
      <div>
        <h1 className="mx-auto">{menuName}</h1>
        <h2>{homeCookName}</h2>
        <h3>{menuDescription}</h3>
      </div>
    );
  }
}

export default Menu;
