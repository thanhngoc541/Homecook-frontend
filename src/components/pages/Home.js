import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/index";
import MenuList from "../wrappers/MenuList";
import DishList from "../wrappers/DishList";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import Loading from "../items/Loading";
import Jumpotron from "../items/Jumpotron";

function Home(props) {
  let [dishes, setDishes] = useState([]);
  let [menus, setMenus] = useState([]);
  let [prevDish, setprevDish] = useState([]);
  //---
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

  const getTopMenus = () => {
    api.getTopMenus().then((response) => {
      setMenus(response);
    });
  };


  useEffect(() => {
    fetchDishes();
    setLoading(false);
  }, []);

  useEffect(() => {
    getTopMenus();
  }, []);

  return (
    <div className="bg-grey">
      <div className="container p-3">
        <Jumpotron />
        <div></div>
        <div className="d-flex justify-content-between">
          <h2>Best Seller <span><img style={{display:'inline',height:'40px',width:'40px'}} src="https://img.icons8.com/ios/50/000000/best-seller.png"/></span></h2>
          
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
