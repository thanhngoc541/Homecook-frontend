import React, { useState, useEffect, useMemo, useCallback } from "react";
import api from "../../api/index";
import Loading from "../items/Loading";
import Pagination from "@material-ui/lab/Pagination";
import DishList from "../wrappers/DishList";
import Jumpotron from "../items/Jumpotron";

function DishesPage() {
  let [dishes, setDishes] = useState([]);
  let [prevDish, setprevDish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const countAllDishes = useCallback(() => {
    console.log("count dishes called");
    api.countDishes(true).then((res) => setTotal(res));
  }, []);

  const fetchDishes = () => {
    api.getDishesByStatus(true, page).then((res) => {
      setDishes(res);
    });
  };

  const count = useMemo(() => {
    console.log("count page called");
    return Math.ceil(total / 8);
  }, [total]);

  useEffect(() => {
    countAllDishes();
  }, []);

  useEffect(() => {
    fetchDishes();
    setprevDish(dishes);
    setLoading(false);
  }, [page, count]);

  return (
    <div className="bg-grey">
      <div className="container p-3">
        <Jumpotron />
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
