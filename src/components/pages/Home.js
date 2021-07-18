import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import Loading from "../items/Loading";
import Jumpotron from "../items/Jumpotron";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SidebarHome from "../items/SidebarHome";
import { Col } from "reactstrap";
import CarouselHome from "../items/CarouselHome";

function Home(props) {
  let [dishes, setDishes] = useState([]);
  let [menus, setMenus] = useState([]);

  const fetchDishes = async () => {
    await api.getDishesByStatus(true, 1).then((res) => setDishes(res));
    console.log(dishes);
  };

  const getMenus = () => {
    api.getMenus().then((response) => {
      setMenus(response);
    });
  };
  const getTopMenus = () => {
    api.getTopMenus().then((response) => {
      setMenus(response);
    });
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    getTopMenus();
  }, []);

  return (
    <div className="bg-grey">
      {<CarouselHome items={dishes} />}
      <div className="container p-3 row">
        <hr />

        <Col md={2} className="d-none d-lg-block">
          <SidebarHome />
        </Col>
        <Col>
         
          <div className="d-flex justify-content-between p-3">
            <h2>
              Best Seller{" "}
              <span>
                <img
                  style={{ display: "inline", height: "40px", width: "40px" }}
                  src="https://img.icons8.com/ios/50/000000/best-seller.png"
                />
              </span>
            </h2>
            <Link to="/menus" className="text-primary">
              View All <ArrowForwardIosIcon fontSize="small" />
            </Link>
          </div>
          {menus.length < 1 ? (
            <Loading />
          ) : (
            <MenuList handleDelete={null} menus={menus} />
          )}
          <div className="container p-3">
            <div className="d-flex justify-content-between">
              <h2>Featured Dishes</h2>
              <Link to="/dishes" className="text-primary">
                View All <ArrowForwardIosIcon fontSize="small" />
              </Link>
            </div>
            {dishes.length < 1 ? <Loading /> : <DishList dishes={dishes} />}
          </div>
        </Col>
      </div>
    </div>
  );
}
export default Home;
