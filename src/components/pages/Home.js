import React, { useState, useEffect } from "react";
import { Stagger } from "react-animation-components";
import { Link } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "../items/Loading";

function Home(props) {
  let [dishes, setDishes] = useState([]);
  let [menus, setMenus] = useState([]);
  let [prevDish, setprevDish] = useState([]);
  //---
  const [loading, setLoading] = useState(true);

  const getMenus = () => {
    api.getMenus().then((response) => {
      setMenus(response);
    });
  };

  const fetchDishes = () => {
    api.getDishesByStatus(true, 1).then((res) => {
      setDishes(res);
    });
  };
  useEffect(() => {
    fetchDishes();
    setLoading(false);
  }, []);

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <div className="bg-grey">
      <div className="container p-3">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Fluid jumbotron</h1>
            <p class="lead">
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </div>
        </div>
        <div></div>
        <div className="d-flex justify-content-between">
          <h2>Menu List</h2>
          <Link to="/menus">See More</Link>
        </div>
        {menus ? <MenuList handleDelete={null} menus={menus} /> : <Loading />}
      </div>
      <hr />
      <div className="container p-3">
        <div className="d-flex justify-content-between">
          <h2>Featured Dishes</h2>
          <Link to="/dishes">See More</Link>
        </div>
        {loading || dishes.length < 1 || dishes === prevDish ? (
          <Loading />
        ) : (
          <DishList dishes={dishes} />
        )}
      </div>
    </div>
  );
}
export default Home;
