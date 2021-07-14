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
import DishForm from '../items/DishForm';
import Popup from 'reactjs-popup';
import Swal from "sweetalert2";
import DishList from "../wrappers/DishList";
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
  var [dishes, setDishes] = useState([]);
  var [HomeCookName, setHomeCookName] = useState("");
  var [isCreating, setIsCreating] = useState(false);
  var [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    api.getMenuByHomeCookID(HomeCookID).then((res) => {
      setMenus(res);
      console.log(res);
      if (!!res) setHomeCookName(res[0].HomeCookName);
    });
    api.getDishesByHomecookID(HomeCookID).then((res) => {
      setDishes(res);
      console.log(res);
    });
    console.log(menus);
  }, []);
  const handleDelete = (MenuID, SUCCESS) => {
    Swal.fire({
      title: "Do you want to delete this menu?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteMenu(MenuID).then((res) => {
          console.log(res);
          if (res != null && res.ok) {
            Swal.fire("Deleted!", "Your menu has been deleted.", "success");
            SUCCESS();
            menus.forEach((menu, index) => {
              console.log(menu.MenuID);
              console.log(MenuID);
              console.log(index);
              console.log((menu.MenuID === MenuID));
              if (menu.MenuID == MenuID) {
                menus.splice(index, 1);
                return;
              }

            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              //footer: '<a href="">Why do I have this issue?</a>'
            })
          }
        });

      }
    });
  }
  const deleteDish = (DishId, SUCCESS) => {
    Swal.fire({
      title: "Do you want to delete this dish?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteDish(DishId).then((res) => {
          console.log(res);
          if (res != null && res.ok) {
            Swal.fire("Deleted!", "Your dish has been deleted.", "success");
            SUCCESS();
            dishes.forEach((dish, index) => {
           
              console.log(index);
              console.log((dish.DishId === DishId));
              if (dish.DishId == DishId) {
                dishes.splice(index, 1);
                return;
              }

            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              //footer: '<a href="">Why do I have this issue?</a>'
            })
          }
        });

      }
    });
  }
  const createMenu = async (menu) => {
    if (menus.length > 2) {
      Swal.fire({
        icon: "error",
        title: "Alert!",
        text: "You cannot have more than 3 menus!",
      });
    } else {
      await api.createMenu(menu).then((res) => { menus.push(res); Swal.fire("Create success!", "Your menu has been added.", "success"); });
    }
  }
  const createDish = async (dish) => {
    if (dishes.length > 14) {
      Swal.fire({
        icon: "error",
        title: "Alert!",
        text: "You cannot have more than 15 dishes!",
      });
    } else {
      await api.createDish(dish).then((res) => {
        console.log(res); 
        dish.DishId = res; 
        dishes.push(dish);
        Swal.fire("Create success!", "Your dish has been created.", "success");
      });
    }
  }
  return (
    <div>

      {menus == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="container p-3">
            <h2>My menus<span><button className="rounded-pill float-right btn btn-success"
              onClick={() => { setIsCreating(true); console.log(isCreating); }}>
              <i class=" fa fa-plus .text-dark"></i> <span>New</span>
            </button></span></h2>
            <MenuList handleDelete={handleDelete} menus={menus}></MenuList>
          </div>
          <Popup open={isCreating} position="right center" onClose={() => setIsCreating(false)}>
            <MenuForm save={createMenu} isCreate={true} menu={{ HomeCookID, HomeCookName }} close={() => setIsCreating(false)}></MenuForm>
          </Popup>
          <div className="container p-3">
            <h2 className="my-4">My  dishes <span><button className="rounded-pill float-right btn btn-success" onClick={() => { setIsAdding(true); console.log(isAdding); }}>
              <i class=" fa fa-plus .text-dark"></i> <span>New</span>
            </button></span></h2>
            <Popup open={isAdding} position="right center" onClose={() => { setIsAdding(false); }}>
              <div className="position-fixed top-50 start-50 translate-middle">
                <DishForm Dish={{ HomeCookID }} isCreate={true} save={createDish} close={() => setIsAdding(false)}></DishForm>
              </div>
            </Popup>
            <DishList dishes={dishes} deleteDish={deleteDish}></DishList>
          </div>
        </div>
      )}

    </div>
  );
}
export default Menu;
