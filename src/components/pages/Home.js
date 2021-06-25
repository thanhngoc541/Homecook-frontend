import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import api from "../../api/index";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Dish from "../items/Dish";
import baseUrl from "../baseURL";

import MenuList from "../wrappers/MenuList";

function Home(props) {
  const url = baseUrl + "dishes/status/true";

  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    const response = await fetch(url);
    const newDishes = await response.json();
    setDishes(newDishes);
  };
  const getMenus = async () => {
    await api.getMenus().then((response) => {
      setMenus(response);
    });
  };
  useEffect(() => {
    getMenus();
    fetchDishes();
    setLoading(false);
    console.log(menus);
  }, []);

  if (loading || menus == null) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  const DishList = () => {
    return (
      <div className="container my-3">
        <h2>Featured Dishes</h2>
        <Row>
          {dishes
            .filter((dish) => dish.IsAvailable)
            .map((dish) => {
              return (
                <Col  sm={6} lg={4} key={dish.DishId}>
                  <Dish dish={dish} />
                </Col>
              );
            })}
        </Row>
      </div>
    );
  };
  return (
    <div className="bg-grey">
      <MenuList menus={menus} />
      <DishList />
    </div>
  );
}
export default Home;
