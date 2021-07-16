import React, { useState, useEffect } from "react";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import { Row } from "reactstrap";
import DishList from "../wrappers/DishList";
import Dish from "../items/Dish";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "../items/Loading";

function Home(props) {
  let [dishes, setDishes] = useState([]);
  let [menus, setMenus] = useState([]);
  let [prevDish, setprevDish] = useState([]);
  //---
  const [loading, setLoading] = useState(true);
  //----
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);

  };
  const countDishes = () => {
    api.countDishes(true).then((res) => {
      setTotal(res);
    })
  };
  const count = Math.ceil(total / 8);
  const getMenus = () => {
    api.getMenus().then((response) => {
      setMenus(response);
    });
  };


  const fetchDishes = () => {
    console.log(page);
    api.getDishesByStatus(true, page).then((res) => {
      setDishes(res)
    })
  }
  useEffect(() => {
    countDishes();

    fetchDishes();
    setprevDish(dishes);
    setLoading(false);
  }, [page, count]);

  useEffect(() => {
    getMenus();
  }, []);
  console.log(dishes);
  console.log(dishes);
  if (loading || dishes.length < 1 || dishes === prevDish) {
    return <Loading />;
  }
  return (
    <div className="bg-grey">
      <div className="container p-3">
        <h2>Menu List</h2>
        <MenuList handleDelete={null} menus={menus} />
      </div>
      <div className="container p-3">
        <h2>Featured Dishes</h2>
        <DishList dishes={dishes} />
        <Pagination
            variant="outlined"
            shape="rounded"
            size="large"
            page={page}
            count={count}
            onChange={handleChangePage}
          />
      </div>
    </div>
  );
}
export default Home;
