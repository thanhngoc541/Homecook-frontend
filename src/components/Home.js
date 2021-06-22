import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  Button,
  Col,
  Navbar,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Media,
} from "reactstrap";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Dish from "./Dish";
import Menu from "./Menu";
import baseUrl from "./baseURL";
import { datamenu, datadishes } from "../dishData";

import dishData from "../dishData";
  
function Home(props) {
  const url = baseUrl + "dishes/status/true";

  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState(datamenu);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    const response = await fetch(url);
    const newDishes = await response.json();
    console.log(newDishes);
    setDishes(newDishes);
    setLoading(false);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  if (loading) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  const SearchBar = () => {
    return (
      <Navbar light expand="md" className="container shadow-sm">
        <Nav navbar className="ml-auto">
          <NavItem>
            <Form>
              <FormGroup>
                <InputGroup>
                  <Input
                    type="text"
                    name="search-bar"
                    id="search-bar"
                    placeholder="Search here"
                  />
                  <Button>Search</Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };

  const HomeCookList = () => {
    return (
      <div className="container-fluid my-3">
        <h2>Featured menus</h2>
        <Row>
          {menus
            .filter((menu) => menu.IsActive)
            .map((menu) => (
              <Col
                key={menu.UserID}
                md={4}
                className="media bg-white shadow-sm rounded align-items-center text-sm"
              >
                <Menu menu={menu} />
              </Col>
            ))}
        </Row>
      </div>
    );
  };
  const DishList = () => {
    return (
      <div className="container-fluid my-3">
        <h2>Featured Dishes</h2>
        <Row>
          {dishes
            .filter((dish) => dish.IsAvailable)
            .map((dish) => {
              return (
                <Col md={4} key={dish.DishId}>
                  <Dish dish={dish} />
                </Col>
              );
            })}
        </Row>
      </div>
    );
  };
  return (
    <div className="bg-grey">
      <SearchBar />
      <HomeCookList />
      <DishList />
    </div>
  );
}
export default Home;
