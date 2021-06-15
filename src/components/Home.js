import React, { useState } from "react";
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
import Cook from "./Cook";
import { datacooks, datadishes } from "../data";

function Home(props) {
  // const url = baseUrl + "dishes/status/true";

  const [dishes, setDishes] = useState(datadishes);
  const [cooks, setCooks] = useState(datacooks);
  const [loading, setLoading] = useState(true);

  // const fetchDishes = async () => {
  //   const response = await fetch(url);
  //   const newDishes = await response.json();
  //   setDishes(newDishes);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchDishes();
  // }, []);

  // if (loading) {
  //   return (
  //     <section>
  //       <h1>Loading...</h1>
  //     </section>
  //   );
  // }

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
        <h2>Featured restaurants</h2>
        <Row>
          {cooks
            .filter((cook) => cook.IsActive)
            .map((cook) => (
              <Col
                key={cook.UserID}
                md={4}
                className="media bg-white shadow-sm rounded align-items-center text-sm"
              >
                <Cook cook={cook} />
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
