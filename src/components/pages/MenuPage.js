import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Fade, Stagger } from "react-animation-components";
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import api from "../../api";
import MenuList from "../wrappers/MenuList";
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
  var { homeCookId } = useParams();
  var [menus, setMenus] = useState();

  useEffect(() => {
    api.getMenuByHomeCookID(homeCookId).then((res) => {
      console.log(res);
      setMenus(res);
    });
    console.log("From Menu "+menus);
  }, [menus]);

  return (
    <div>
      {menus == null ? (
        <h1>Loading...</h1>
      ) : (
        <MenuList menus={menus}></MenuList>
      )}
    </div>
  );
}
export default Menu;
