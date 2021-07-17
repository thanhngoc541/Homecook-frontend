import React, { useState, useEffect } from "react";
import api from "../../api/index";
import Loading from "../items/Loading";
import Pagination from "@material-ui/lab/Pagination";
import DishList from "../wrappers/DishList";
import MenuList from "../wrappers/MenuList";
import Jumpotron from "../items/Jumpotron";

function MenuPage() {
  let [Menus, setMenus] = useState([]);
  let [prevDish, setprevDish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("all");
  const handleChangePage = (event, value) => {
    setLoading(true);
    setPage(value);
  };
  const countMenus = (name) => {
    api.getTotalSearchedMenu(name).then((res) => {
      setTotal(res);
    });
  };

  const fetchMenus = (name) => {
    console.log(page);
    api.getSearchedMenu(name, page).then((res) => {
      setMenus(res);
    });
  };

  const count = Math.ceil(total / 8);
  useEffect(() => {
    countMenus(search);
  }, [search]);
  useEffect(() => {
  
    fetchMenus(search);
    setprevDish(Menus);
    setLoading(false);
  }, [search, page]);

  return (
    <div className="bg-grey">
      <div className="container p-3">
        <h3>Menu</h3>
        <input type="text" placeholder="Menu name" onKeyDown={(e) => { if (e.key === "Enter") {page=1;setSearch(e.target.value==""?"all":e.target.value); }}} />
        <div>
          {loading || Menus.length < 1 || Menus === prevDish ? (
            <Loading />
          ) : (
            <MenuList menus={Menus} />
          )}
        </div>
        <div className="my-3">
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

export default MenuPage;
