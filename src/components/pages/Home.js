import React, { useState, useEffect } from "react";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import { Spinner } from "reactstrap";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";

function Home(props) {
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = () => {
    api.getDishesByStatus(true).then((response) => setDishes(response));
  };

  const getMenus = () => {
    api.getMenus().then((response) => {
      setMenus(response);
    });
  };

  useEffect(() => {
    getMenus();
    fetchDishes();
    setLoading(false);
  }, []);

  if (loading || dishes.length < 1) {
    return (
      <section>
        <h1>Loading...</h1>
        <Spinner color="success" />
      </section>
    );
  }

  return (
    <div className="bg-grey">
      <div className="container p-3">
        <h2>Menu List</h2>
        <MenuList menus={menus} />
      </div>
      <div className="container p-3">
        <h2>Featured Dishes</h2>
        <DishList dishes={dishes} />
      </div>
    </div>
  );
}
export default Home;
