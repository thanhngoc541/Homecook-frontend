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

  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const countDishes = async () => {
    const res = await api.countDishes(true);
    setTotal(res);
  };

  const fetchDishes = async () => {
    console.log(page);
    await api.getDishesByStatus(true, page).then((res) => setDishes(res));
    console.log(dishes);
  };

  const count = Math.ceil(total / 15);
  useEffect(() => {
    countDishes();
    fetchDishes();
  }, [page, count]);

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
      <div className="container p-3 row">
        {/* <CarouselHome /> */}
        <hr />
        <Jumpotron />
        <Col md={2}>
          <SidebarHome />
        </Col>
        <Col>
        <hr />
        <div className="d-flex justify-content-between">
        <h2>Best Seller <span><img style={{display: 'inline',height: '40px',width: '40px'}} src="https://img.icons8.com/ios/50/000000/best-seller.png"/></span></h2>
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
      </div >
    </div >
  );
}
export default Home;
