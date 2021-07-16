import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";
import Button from "@material-ui/core/Button";
import Loading from "../items/Loading";
import Jumpotron from "../items/Jumpotron";

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
        <Jumpotron />
        <div></div>
        <div className="d-flex justify-content-between">
          <h2>Menu List</h2>
          <Link to="/menus">
            <Button color="primary" variant="outlined">
              See More
            </Button>
          </Link>
        </div>
        {menus ? <MenuList handleDelete={null} menus={menus} /> : <Loading />}
      </div>
      <hr />
      <div className="container p-3">
        <div className="d-flex justify-content-between">
          <h2>Featured Dishes</h2>
          <Link to="/dishes">
            <Button color="primary" variant="outlined">
              See More
            </Button>
          </Link>
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
