import React, { useState, useEffect, useMemo, useCallback } from "react";
import api from "../../api/index";
import Loading from "../items/Loading";
import Pagination from "@material-ui/lab/Pagination";
import DishList from "../wrappers/DishList";
import Jumpotron from "../items/Jumpotron";
import SidebarHome from "../items/SidebarHome";
import { Col } from "reactstrap";

function DishesPage() {
  let [dishes, setDishes] = useState([]);
  let [prevDish, setprevDish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("all");

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const countAllDishes = useCallback((name) => {
    api.countDishes(true, name).then((res) => setTotal(res));
  }, []);

  const fetchDishes = (name) => {
    api.getDishesByStatus(true, name ,page).then((res) => {
      setDishes(res);
    });
  };

  const count = useMemo(() => {
    return Math.ceil(total / 6);
  }, [total]);

  useEffect(() => {
    countAllDishes(search);
  }, [search]);

  useEffect(() => {
    fetchDishes(search);
    setprevDish(dishes);
    setLoading(false);
  }, [search, page]);

  return (
    <div className="bg-grey">
      <div className="container row p-3">
        <Col md={2} className="d-none d-lg-block">
          <SidebarHome />
        </Col>

        <Col>
          <h3 className="justify-content-center"> Avalible Dishes </h3>
          <div>
            <div class="search-form">
              <i class="fa fa-search search-icon" aria-hidden="true"></i>
              <input
                type="text"
                class="search-input"
                placeholder="Dish name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPage(1);
                    setSearch(e.target.value == "" ? "all" : e.target.value);
                  }
                }}
              />
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
        </Col>
      </div>
    </div>
  );
}

export default DishesPage;
