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
  const [menus, setMenus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    await api
      .getDishesByHomecookID("6ABE8D62-72D2-4F13-B790-C35EA529365B")
      .then((response) => setDishes(response));
  };
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
    setLoading(false);
    console.log(menus);
  }, [menus]);

  useEffect(() => {
    fetchDishes();
  }, [dishes]);

  if (loading || menus == null) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <div className="bg-grey">
      <MenuList menus={menus} />
      <DishList dishes={dishes} />
    </div>
  );
}
export default Home;
