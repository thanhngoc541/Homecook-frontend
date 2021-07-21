
import React, { useState, useEffect } from "react";
import api from "../../api";
import MenuForm from '../items/MenuForm';
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
import AddDishToMenu from '../wrappers/AddDishToMenu';
import HomeCookMenuList from "../wrappers/HomeCook_MenuList";
import { Fade } from "react-animation-components";
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
    height: '40vh',
    overflowY: 'scroll',
    marginBottom: '20px'
  },
}));
const styleActivate  = {
  backgroundColor: 'crimson'
}
function Menu({ HomeCookID, HomeCookName }) {
  let [selectedMenu, setSelectedMenu] = useState(null);
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [menu, setMenu] = useState(null);
  const [listDish, setListDish] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  let [isUpdating, setIsUpdating] = useState(false);
  const getMenu = (menuId) => {
    api.getMenuByID(menuId).then((res) => {
      setMenu(res);
    });
  };

  function isImgLink(url) {
    if (typeof url !== "string") return false;
    return (
      url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null
    );
  }
  useEffect(() => {
    if (selectedMenu != null) getDishesinMenuID(selectedMenu)
    console.log(selectedMenu);
  }, [selectedMenu]);
  useEffect(()=>{
    console.log("dishes effect");
  },[dishes]);
  // useEffect(() => {
  //   console.log(menuId);
  //   getMenu(menuId);
  //   console.log(menu);
  //   if (menuId != null) getDishesinMenuID(menuId);
  // }, [menuId], [menu], [dishes]);
  const handleAddDish = (Dish) => {
    api.addDishToMenu(Dish.DishId, selectedMenu).then((res) => {
      console.log(res);
      if (res.ok) {
        dishes.push(Dish);
        setDishes([...dishes]);
        Swal.fire("Success!", "Your dish has been added.", "success");
      } else
        Swal.fire({
          icon: "error",
          title: "Action failed",
          text: "Your menu still remain!",
          //footer: '<a href="">Why do I have this issue?</a>'
        });
    });
  };
  const handleRemoveDish = (DishId) => {
    Swal.fire({
      title: "Do you want to remove this dish?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {

        api.removeDishFromMenu(DishId, selectedMenu).then((res) => {
          if (res.ok) {
            dishes.forEach((dish,index) => {
              if (dishes.DishId == DishId) {
                dishes.splice(index, 1);
                return;
              }
            });
            setDishes([...dishes]);
            Swal.fire("Success!", "Your dish has been removed.", "success");
          }
        });
      }
    });
  };
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
  const getDishesinMenuID = async (id) => {
    await api.getMenuByID(id).then((res) => { console.log(res); setDishes(res.Dishes.filter((dish) => dish.IsAvailable)) });
  }

  const updateMenu = async (tmenu) => {
    api.updateMenu(tmenu).then((res) => {
      if (res.ok) {
        setMenu({
          ...menu,
          MenuName: tmenu.MenuName,
          MenuDescription: tmenu.MenuDescription,
          MenuURL: tmenu.MenuURL,
          IsServing: tmenu.IsServing,
        });
        Swal.fire("Updated!", "Your menu has been updated.", "success");
      }
    });
  };



  return (

    <div> 
      <Row>
        <Col md={8} >
          <HomeCookMenuList HomeCookName={HomeCookName} HomeCookID={HomeCookID} setSelectedMenu={setSelectedMenu}></HomeCookMenuList></Col>
        <Col md={4} >
          <div className="container featuredItem" style={{marginTop:"90px",height:"65vh"}}>

            <Popup
              open={isUpdating}
              position="center center"
              onClose={() => setIsUpdating(false)}
            >
              <MenuForm
                save={updateMenu}
                isCreate={false}
                menu={menu}
                close={() => setIsUpdating(false)}
              ></MenuForm>
            </Popup>
            <h2 className="my-4">
              Dishes
              <span>
                <button
                  className="rounded-pill float-right btn btn-success mx-3"
                  onClick={() => {
                    setIsAdding(true);
                    console.log(isAdding);
                  }}>
                  <i class=" fa fa-plus .text-dark"></i> <span>Add dish</span>
                </button>
              </span>
            </h2>
            <Popup
              open={isAdding}
              position="right center"
              onClose={() => {
                setIsAdding(false);
              }}
            >
              <div className="position-fixed top-50 start-50 translate-middle">
                <AddDishToMenu
                  close={() => {
                    setIsAdding(false);
                    console.log(isAdding);
                  }}
                  handleAddDish={handleAddDish}
                  HomeCookID={HomeCookID}
                ></AddDishToMenu>
              </div>
            </Popup>
            <Fade in>

              <div className="" styles={{ height: '500px !important', overflowY: 'scroll', whiteSpace: "nowrap" }} >

                <List dense className={[classes.root, "cart-items"," pt-3"]}>


                  {dishes == null ? null : dishes.map((dish, index) => {
                    const labelId = `checkbox-list-secondary-label-${index}`;
                    return (
                      <ListItem key={index} button onClick={handleToggle(dish.DishId)}>
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
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(dish.DishId)}
                            checked={checked.indexOf(dish.DishId) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                            color='default'
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}

                </List>
                <button className="btn btn-danger float-right" onClick={() => {
                  checked.map((id) => {
                    console.log(id);
                    handleRemoveDish(id);

                  })
                }}>Remove</button>
              </div>

            </Fade >
          </div>
        </Col>
      </Row>
    </div>
  );

}
export default Menu;

