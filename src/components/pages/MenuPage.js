import React, { useState, useEffect } from "react";
import api from "../../api/index";
import Loading from "../items/Loading";
import Pagination from "@material-ui/lab/Pagination";
import DishList from "../wrappers/DishList";
import MenuList from "../wrappers/MenuList";
import Jumpotron from "../items/Jumpotron";
import SidebarHome from "../items/SidebarHome";
import { Col, Row } from "reactstrap";
import { Alert } from '@material-ui/lab';

function MenuPage() {
  let [Menus, setMenus] = useState([]);
  let [prevMenu, setprevMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  var [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("all");
  const handleChangePage = (event, value) => {
    if (value !== page) setLoading(true);
    console.log(page);
    console.log(loading);
    if (value !== page) setPage(value);
    // setPage(value);
  };
  //-----------HUY SUA THEM STATUS = TRUE
  const countMenus = (name) => {
    api.getTotalSearchedMenu(name, "true").then((res) => {
      setTotal(res);
      console.log(res);
    });
  };

  const fetchMenus = (name) => {
    console.log(page);
    api.getSearchedMenu(name, page, "true").then((res) => {
      setMenus(res);
      console.log(res);
    });
  };
  //-----------HUY SUA THEM STATUS = TRUE
  const count = Math.ceil(total / 15);
  useEffect(() => {
    countMenus(search);
  }, [search]);
  useEffect(() => {
    fetchMenus(search);
    setprevMenu(Menus);
    setLoading(false);
  }, [search, page]);
  console.log(Menus);
  return (
    <div className="bg-grey">
      <div className="container p-3">
        <Row>
          <Col md={2} className="d-none d-lg-block">
            <SidebarHome />
          </Col>
          <Col>
            <h3
              className="justify-content-center m-3"
              style={{ display: "inline-block" }}
            >
              {" "}
              Avalible Menu{" "}
            </h3>

            <div class="search-form float-right m-3">
              <i class="fa fa-search search-icon" aria-hidden="true"></i>
              <input
                type="text"
                class="search-input"
                placeholder="Menu name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPage(1);
                    setSearch(e.target.value === "" ? "all" : e.target.value);
                  }
                }}
              />
            </div>

            <div>
              {loading || Menus.length < 1 || Menus === setprevMenu ? (
                <Loading />
              ) : (
                <MenuList menus={Menus} />
              )}
              {/* {
                Menus?.length < 1 ? (
                  <Alert variant="filled">
                    <h3>Dish not found</h3>
                  </Alert>
                ) : (
                  <div>
                    {
                      loading || Menus === prevMenu ? (
                        <Loading />
                      ) : (
                        <MenuList Menus={Menus} />
                      )
                    }
                  </div>

                )
              } */}
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
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MenuPage;
