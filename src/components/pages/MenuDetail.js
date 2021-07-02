import Popup from 'reactjs-popup';
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
import DishList from "../wrappers/DishList";
import AddDishToMenu from '../wrappers/AddDishToMenu';
function Menu() {
  var { menuId } = useParams();
  const [menu, setMenu] = useState(null);
  const [listDish, setListDish] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const getMenu = (menuId) => {
    api.getMenuByID(menuId).then((res) => { setMenu(res) });
  }

  useEffect(() => {
    console.log(menuId);
    getMenu(menuId);
    console.log(menu);

  }, [])
  if (menu == null) return <p>loading</p>; else {
    var { MenuName, HomeCookName, rating, Dishes, MenuURL, MenuDescription, HomeCookID, MenuID } = menu;

    return (
      <div className="m-3">
        <Card className="p-0">
          <CardBody className="row p-0">
            <Col md={1} className="bg-light rounded p-0 m-auto" style={{ padding: 'none' }}>
              <CardImg top width="100%" height="100%" src={MenuURL} alt="MenuIMG" />
            </Col>
            <Col md={7} className="mx-0 py-3">
              <CardTitle tag="h2" className="text-dark">
                <strong>{MenuName}</strong>
              </CardTitle>
              <CardSubtitle tag="h6" className=" text-muted">{HomeCookName}</CardSubtitle>
              <CardText className="m-0">{MenuDescription}</CardText>
              <ReactStars
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              />
            </Col>
            <Col md={2} className="m-auto ">
              <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
                Add dish to menu
              </button>
              <Popup open={isAdding} position="right center" onClose={()=>setIsAdding(false)}>
                <div className="position-fixed top-50 start-50 translate-middle"> <AddDishToMenu close={() => { setIsAdding(false); console.log(isAdding); }} MenuID={menuId} HomeCookID={HomeCookID}></AddDishToMenu>
                </div>
              </Popup>


            </Col>
          </CardBody>
        </Card>

        <DishList dishes={Dishes} MenuID={MenuID}></DishList>

      </div>
    );
  }
}

export default Menu;
