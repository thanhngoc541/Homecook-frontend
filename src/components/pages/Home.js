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
import api from '../../api/index';
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Dish from "../items/Dish";
import Menu from "../items/Menu";
import baseUrl from "../baseURL";

import dishData from "../../dishData";
import Menu_Wrapper from "../wrappers/Menu_Wrapper";
  
function Home(props) {
  const url = baseUrl + "dishes/status/true";

  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    const response = await fetch(url);
    const newDishes = await response.json();
    console.log(newDishes);
    setDishes(newDishes);
  };
   const getMenus= async ()=>
  {
      await api.getMenus().then((response)=>{setMenus(response)});
  }
  useEffect(() => {
    getMenus()
    fetchDishes();
    setLoading(false);
    console.log(menus);
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
      {menus == null ? <h1>Loading menu</h1> : <Menu_Wrapper menus={menus}></Menu_Wrapper>}
      <DishList />
    </div>
  );
}
export default Home;
