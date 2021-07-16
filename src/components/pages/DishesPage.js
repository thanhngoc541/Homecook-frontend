import React, { useState, useEffect } from "react";
import api from "../../api/index";
import Loading from "../items/Loading";
import Pagination from "@material-ui/lab/Pagination";
import DishList from "../wrappers/DishList";

function DishesPage() {
  let [dishes, setDishes] = useState([]);
  let [prevDish, setprevDish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const countDishes = () => {
    api.countDishes(true).then((res) => {
      setTotal(res);
    });
  };

  const fetchDishes = () => {
    console.log(page);
    api.getDishesByStatus(true, page).then((res) => {
      setDishes(res);
    });
  };

  const count = Math.ceil(total / 8);
  useEffect(() => {
    countDishes();
    fetchDishes();
    setprevDish(dishes);
    setLoading(false);
  }, [page, count]);

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
        <div>
          {loading || dishes.length < 1 || dishes === prevDish ? (
            <Loading />
          ) : (
            <DishList dishes={dishes} />
          )}
        </div>
        <div>
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
    </div>
  );
}

export default DishesPage;
