import Popup from "reactjs-popup";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../../api";
import Dish from "../items/Dish";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg,
} from "reactstrap";
import DishList from "../wrappers/DishList";
import AddDishToMenu from "../wrappers/AddDishToMenu";
import MenuForm from "../items/MenuForm";
import Swal from "sweetalert2";
import Loading from "../items/Loading";
function Menu() {
  var { menuId } = useParams();
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
    console.log(menuId);
    getMenu(menuId);
    console.log(menu);
  }, []);
  const handleAddDish = (Dish) => {
    api.addDishToMenu(Dish.DishId, menuId).then((res) => {
      console.log(res);
      if (res.ok) {
        console.log(menu.Dishes);

        menu.Dishes.push(Dish);
        console.log(menu.Dishes);
        setMenu({ ...menu });
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
  const handleRemoveDish = (DishId, SUCCESS) => {
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
        api.removeDishFromMenu(DishId, menuId).then((res) => {
          if (res.ok) {
            SUCCESS();
            Swal.fire("Success!", "Your dish has been removed.", "success");
          }
        });
      }
    });
  };

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
  if (menu == null) return <Loading />;
  else {
    var {
      MenuName,
      HomeCookName,
      Dishes,
      MenuURL,
      MenuDescription,
      HomeCookID,
    } = menu;

    return (
      <div className="m-3">
        <Card
          className="p-0"
          onClick={() => {
            setIsUpdating(true);
            console.log(isUpdating);
          }}
          onClose={() => (isUpdating = false)}
        >
          <Popup
            open={isUpdating}
            position="right center"
            onClose={() => setIsUpdating(false)}
          >
            <MenuForm
              save={updateMenu}
              isCreate={false}
              menu={menu}
              close={() => setIsUpdating(false)}
            ></MenuForm>
          </Popup>
          <CardBody className="row p-0">
            <Col
              md={1}
              className="bg-light rounded p-0 m-auto"
              style={{ padding: "none" }}
            >
              <CardImg
                top
                width="100%"
                height="100%"
                src={
                  isImgLink(MenuURL)
                    ? MenuURL
                    : "https://incucdep.com/wp-content/uploads/2019/03/mau-thiet-ke-menu-bang-phan2.jpg"
                }
                alt="MenuIMG"
              />
            </Col>
            <Col md={10} className="mx-0 px-0 py-3">
              <CardTitle tag="h2" className="text-dark">
                <strong>{MenuName} </strong>{" "}
                <span>
                  <i class="h3 fa fa-edit .text-dark"></i>
                </span>
              </CardTitle>

              <CardSubtitle tag="h6" className=" text-muted">
                {HomeCookName}
              </CardSubtitle>
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

        <div className="container p-3">
          <h2 className="my-4">
            Dishes List{" "}
            {/* <span>
              <button
                className="rounded-pill float-right btn btn-success"
                onClick={() => {
                  setIsAdding(true);
                  console.log(isAdding);
                }}
              >
                <i class=" fa fa-plus .text-dark"></i> <span>Add dish</span>
              </button>
            </span> */}
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
          <DishList
            dishes={Dishes}
            handleRemoveDish={handleRemoveDish}
          ></DishList>
        </div>
      </div>
    );
  }
}

export default Menu;
