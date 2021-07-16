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

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    overflowY: 'scroll',
    marginBottom: '20px'
  },
}));
function DishManagement({ HomeCookID }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [dishes, setDishes] = useState([]);
  var [menus, setMenus] = useState();

  var [HomeCookName, setHomeCookName] = useState("");
  var [isCreating, setIsCreating] = useState(false);
  var [isAdding, setIsAdding] = useState(false);
  const handleToggle = (value) => () => {
    // var value=dishes[index].DishId;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
  };
  const getDishesByHomeCookID = async (id) => {
    await api.getDishesByHomecookID(id).then((res) => { console.log(res); setDishes(res) });
  }
  function isImgLink(url) {
    if (typeof url !== "string") return false;
    return (
      url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null
    );
  }
  useEffect(() => {
    getDishesByHomeCookID(HomeCookID);

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
  const deleteDish = (DishId) => {
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
          
            dishes.forEach((dish, index) => {

              console.log(index);
              console.log((dish.DishId === DishId));
              if (dish.DishId == DishId) {
                dishes.splice(index, 1);
                return;
              }

            });
            setDishes([...dishes]);
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
        dishes.push(res);
        setDishes([...dishes]);
        Swal.fire("Create success!", "Your dish has been created.", "success");
      });
    }
  }
  const updateDish = async (dish) => {
  
      await api.updateDish(dish).then((res) => {
        console.log(res);
        dishes.forEach((d,index) => {
          if (d.DishId==dish.DishId) {dishes[index]=dish;setDishes([...dishes]);} 
        });
        Swal.fire("Update success!", "Your dish has been update.", "success");
      });
    
  }
  return (


    <div className="container p-3" >
      <h2 className="my-4 px-3">Dishes <span><button className="rounded-pill float-right btn btn-success" onClick={() => { setIsAdding(true); console.log(isAdding); }}>
        <i class=" fa fa-plus .text-dark"></i> <span>New</span>
      </button></span></h2>
      <Popup open={isAdding} position="right center" onClose={() => { setIsAdding(false); }}>
        <div className="position-fixed top-50 start-50 translate-middle">
          <DishForm Dish={{ HomeCookID }} isCreate={true} save={createDish} close={() => setIsAdding(false)}></DishForm>
        </div>
      </Popup>
      <Fade in>

        <div styles={{ height: '500px !important', overflowY: 'scroll', whiteSpace: "nowrap" }} >

          <List dense className={[classes.root, "cart-items"]}>
            {dishes.map((dish, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              return (
                <div className="position-relative">
                  <Popup trigger={<ListItem key={index} button onClick={handleToggle(index)} style={{ width: "calc(80%-50px)" }}>
                    <ListItemAvatar>
                      <Avatar
                        alt={"Dish"}
                        src={isImgLink(dish.ImageURL)
                          ? dish.ImageURL
                          : "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg"}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={dish.DishName} />
                    <ListItemSecondaryAction>
                      {/* <Checkbox
                      edge="end"
                      onChange={handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      color='default'
                    /> */}
                    </ListItemSecondaryAction>

                  </ListItem>} position="center">
                    {(close) => <div className="position-fixed  translate-middle" >
                      <DishForm Dish={dish} isCreate={false} save={updateDish} close={close}></DishForm>
                    </div>}

                  </Popup>

                  <button onClick={()=>{deleteDish(dish.DishId)}} className=" position-absolute btn btn-danger" style={{ top: "0", right: "10px" }}>Delete</button>
                </div>
              );
            })}

          </List>
        </div>

      </Fade >
    </div>

  );
}
export default DishManagement;
