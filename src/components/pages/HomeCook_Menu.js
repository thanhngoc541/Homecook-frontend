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
import HomeCookMenuDetail from "./HomeCook_MenuDetail";
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
function Menu({HomeCookID, HomeCookName}) {
  var [menus, setMenus] = useState();
  let [selectedMenu , setSelectedMenu]=useState(null);
  var [isCreating, setIsCreating] = useState(false);
  var [isStart,setIsStart] = useState(true);
  useEffect(() => {
    console.log("Useeffectt");
    console.log(selectedMenu);
    api.getMenuByHomeCookID(HomeCookID).then((res) => {
      setMenus(res);
     if (res.length>0 && isStart) {setSelectedMenu(res[0].MenuID);setIsStart(false)}
      console.log(res);
     
    });
    console.log(menus);
  }, [selectedMenu]);
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
 
  return (
    <div>
      {menus == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="container px-5 py-3" >
            <h2>menus<span><button className=" mx-3 rounded-pill float-right btn btn-success"
              onClick={() => { setIsCreating(true); console.log(isCreating); }}>
              <i class=" fa fa-plus .text-dark"></i> <span>New</span>
            </button></span></h2>
            <MenuList setSelectedMenu={(ID)=>{selectedMenu=ID; setSelectedMenu(ID); console.log(ID);}} handleDelete={handleDelete} menus={menus}></MenuList>
          </div>
          <Popup open={isCreating} position="right center" onClose={() => setIsCreating(false)}>
            <MenuForm save={createMenu} isCreate={true} menu={{ HomeCookID, HomeCookName }} close={() => setIsCreating(false)}></MenuForm>
          </Popup>
        </div>
      )}
      <HomeCookMenuDetail menuId={selectedMenu}> </HomeCookMenuDetail>

    </div>
  );
}
export default Menu;
