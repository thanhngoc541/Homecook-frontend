import React, { useState, useEffect } from "react";
import api from "../../api/index";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";

import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";

function Home(props) {
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    await api.getDishesByStatus(true).then((response) => setDishes(response));
  };

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
      <MenuList menus={menus} />
      <DishList dishes={dishes} />
    </div>
  );
}
export default Home;
