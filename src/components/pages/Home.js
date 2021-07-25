import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";

import Loading from "../items/Loading";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SidebarHome from "../items/SidebarHome";
import { Col } from "reactstrap";
import CarouselHome from "../items/CarouselHome";
import { withRouter } from "react-router-dom";


function Home(props) {
  let [dishes, setDishes] = useState([]);
  let [menus, setMenus] = useState([]);

  const userData = JSON.parse(sessionStorage.getItem("user"));
  const Role = userData?.["Role"];
  

  const fetchDishes = async () => {
    await api.getDishesByStatus(true, "all", 1).then((res) => setDishes(res));
    console.log(dishes);
  };

  const getTopMenus = () => {
    api.getTopMenus().then((response) => {
      setMenus(response);
    });
  };
  useEffect(() => {
    if (Role === "admin") {
      props.history.push("/dashboard");
    } else if (Role === "homecook") {
      props.history.push("/homecook");
    }
  }, [])

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    getTopMenus();
  }, []);

  return (
    <div className="bg-grey">
      <div className="mt-3">{<CarouselHome items={dishes} />}</div>
      <hr />
      <div className="container p-3 row">
        <Col md={2} className="d-none d-lg-block">
          <SidebarHome />
        </Col>
        <Col>
          <div className="container p-3">
            <div className="d-flex justify-content-between">
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
          </div>
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
export default withRouter(Home);
