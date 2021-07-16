import React, { useState, useEffect } from "react";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "../items/Loading";

function Home(props) {
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [page, count]);

  const getMenus = () => {
    api.getMenus().then((response) => {
      setMenus(response);
    });
  };

  useEffect(() => {
    getMenus();
  }, []);

  if (loading || dishes.length < 1) {
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
