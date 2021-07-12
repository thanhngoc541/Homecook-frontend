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
import MenuForm from '../items/MenuForm';
function Menu() {
  var { menuId } = useParams();
  const [menu, setMenu] = useState(null);
  const [listDish, setListDish] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  let [isUpdating, setIsUpdating] = useState(false);
  const getMenu = async (menuId) => {
    await api.getMenuByID(menuId).then((res) => { setMenu(res) });
  }

  useEffect(() => {
    console.log(menuId);
    getMenu(menuId);
    console.log(menu);

  }, []);
  const updateMenu = async (tmenu) => {
    setMenu({
      ...menu,
      MenuName: tmenu.MenuName,
      MenuDescription: tmenu.MenuDescription,
      MenuURL: tmenu.MenuURL,
      IsServing: tmenu.IsServing
    })
    api.updateMenu(tmenu);
  }
  if (menu == null) return <p>loading</p>; else {
    var { MenuName, HomeCookName, Dishes, rating, MenuURL, MenuDescription, HomeCookID, MenuID } = menu;

    return (
      <div className="m-3">

        <Card className="p-0" onClick={() => { setIsUpdating(true); console.log(isUpdating); }} onClose={() => isUpdating = false}
        >
          <Popup open={isUpdating} position="right center" onClose={() => setIsUpdating(false)}>
            <MenuForm save={updateMenu} isCreate={false} menu={menu} close={() => setIsUpdating(false)}></MenuForm>
          </Popup>
          <CardBody className="row p-0">
            <Col md={1} className="bg-light rounded p-0 m-auto" style={{ padding: 'none' }}>
              <CardImg top width="100%" height="100%" src={MenuURL} alt="MenuIMG" />
            </Col>
            <Col md={10} className="mx-0 px-0 py-3">
              <CardTitle tag="h2" className="text-dark">
                <strong>{MenuName} </strong> <span><i class="h3 fa fa-edit .text-dark"></i></span>
              </CardTitle>

              <CardSubtitle tag="h6" className=" text-muted">{HomeCookName}</CardSubtitle>
              <CardText className="m-0">{MenuDescription} </CardText>
              {/* <ReactStars
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              /> */}
            </Col>
          </CardBody>
        </Card>
        <h2 className="my-4">Dishes List <span><button className="rounded-pill float-right btn btn-primary" onClick={() => { setIsAdding(true); console.log(isAdding); }}>
          <i class=" fa fa-plus .text-dark"></i> <span>Add dish</span>
        </button></span></h2>
        <Popup open={isAdding} position="right center" onClose={() => { setIsAdding(false); }}>
          <div className="position-fixed top-50 start-50 translate-middle"> 
          <AddDishToMenu close={() => { setIsAdding(false); console.log(isAdding); }} MenuID={menuId} HomeCookID={HomeCookID}></AddDishToMenu>
          </div>
        </Popup>
        <DishList dishes={Dishes} MenuID={MenuID}></DishList>

      </div >
    );
  }
}

export default Menu;
