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
import MenuForm from '../items/MenuForm';
import Popup from 'reactjs-popup';
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
  var { HomeCookID } = useParams();
  var [menus, setMenus] = useState();
  var [HomeCookName, setHomeCookName] = useState("");
  var [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    api.getMenuByHomeCookID(HomeCookID).then((res) => {
      setMenus(res);
      console.log(res);
      if (!!res) setHomeCookName(res[0].HomeCookName);
    });
    console.log(menus);
  }, []);

  const createMenu = async (menu) => {
    menus.push(menu);
    await api.createMenu(menu).then((res)=> { console.log(res);});
  }
  return (
    <div>

      {menus == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="container p-3">
            <h2>Menu List<span><button className="rounded-pill float-right btn btn-primary" 
            onClick={() => { setIsCreating(true); console.log(isCreating); }}>
              <i class=" fa fa-plus .text-dark"></i> <span>New Menu</span>
            </button></span></h2>
            <MenuList removeable={true} menus={menus}></MenuList>
          </div>
          <Popup open={isCreating} position="right center" onClose={() => setIsCreating(false)}>
            <MenuForm save={createMenu} isCreate={true} menu={{ HomeCookID, HomeCookName }} close={() => setIsCreating(false)}></MenuForm>
          </Popup>
          
        </div>
      )}

    </div>
  );
}
export default Menu;
