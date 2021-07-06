import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import api from "../../api/index";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Dish from "../items/Dish";

import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";

function Home(props) {
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    await api.getDishesByStatus(true).then((response) => setDishes(response));
  };
  //TODO: random dishes
  //  const fetchDishes = async () => {
  //    await api
  //      .getMenuByID("30422222-6158-496E-BC5B-0796056E0510")
  //      .then((response) => {

  //       console.log(response.dishes);

  //       setDishes(response.dishes)});
  //  };

  const getMenus = async () => {
    await api.getMenus().then((response) => {
      setMenus(response);
    });
  };

  useEffect(() => {
    getMenus();
    fetchDishes();
    console.log(menus);
    setLoading(false);
  }, []);

  if (loading || menus == null) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <div className="bg-grey">
       <div className="container p-3">
      <h2>Menu List</h2>
      <MenuList menus={menus} />
      </div>
      <h2>Featured Dishes</h2>
      <DishList dishes={dishes} />
    </div>
  );
}
export default Home;
