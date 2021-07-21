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
import CarouselHome from "../items/CarouselHome";
import SidebarHome from "../items/SidebarHome";
import ReactStars from "react-rating-stars-component";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { TramRounded } from "@material-ui/icons";

import { useGlobalContext } from "../items/context";
function Menu() {
  var { menuId } = useParams();
  const [menu, setMenu] = useState(null);
  const { addMenuToCart } = useGlobalContext();
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

  if (menu == null) return <Loading />;
  var {
    MenuName,
    HomeCookName,
    Dishes,
    MenuURL,
    MenuDescription,
    HomeCookID,
    Rating,
    Servings,
    Price
  } = menu;

  Dishes.sort(function (a, b) {
    return a.Price - b.Price;
  });
  var min = Dishes[0].Price,
    max = Dishes[Dishes.length - 1].Price;

  return (
    <>
      <Card className="my-3">
        <CardBody className="row">
          <Col md={5} className="rounded">
            <CardImg
              top
              width="480px"
              height="300px"
              src={
                isImgLink(MenuURL)
                  ? MenuURL
                  : "https://incucdep.com/wp-content/uploads/2019/03/mau-thiet-ke-menu-bang-phan2.jpg"
              }
              alt="MenuIMG"
            />
          </Col>
          <Col className="ml-3">
            <div>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/home" color="primary">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/menus" color="danger">
                    All menu
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{MenuName}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <CardTitle tag="h2" className="text-dark">
              <strong>{MenuName} </strong>{" "}
            </CardTitle>

            <CardSubtitle tag="h6" className=" text-muted">
              {HomeCookName}
            </CardSubtitle>
            <ReactStars
              count={5}
              value={Rating}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
            <CardText tag="h6">${Price}</CardText>
            <CardText> {Servings} people</CardText>
            <CardText className="m-0">{MenuDescription} </CardText>
            <button
                className="btn btn-success float-right mt-3 ml-3"
                onClick={(e)=>{ addMenuToCart(e,menu)}}
              >
                Buy Now
              </button>
          </Col>
        </CardBody>
      </Card>
      <div className="m-3 row">
        <Col>
          <div className="container p-3">
            <h2 className="mb-4"> Dishes List</h2>
            <DishList isMenu={true} dishes={Dishes}></DishList>
          </div>
        </Col>
      </div>
    </>
  );
}

export default Menu;
