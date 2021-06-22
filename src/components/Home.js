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
import Menu from './Menu';
import data from "../data";
import api from '../api/index';
function Home(props) {
  const [dishes, setDishes] = useState(data);
  const [menus, setMenus] = useState();
  const SearchBar = () => {
    useEffect(async () => {
      await api.getMenus().then((res) => { setMenus(res); return res; })
      console.log(menus);
    })
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

  const MenuList = () => {
    return (
      <div className="container-fluid my-3">
        <h2>Featured restaurants</h2>
        <Row>

          <Col
            md={4}
            classNamRowe="media bg-white shadow-sm rounded align-items-center text-sm"
            >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <Menu {...menus[0]}></Menu>
                </Link>
              </Card>
            </Fade>
          </Col>



          <Col
            md={4}
            classNamRowe="media bg-white shadow-sm rounded align-items-center text-sm"
          >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <Menu {...menus[1]}></Menu>
                </Link>
              </Card>
            </Fade>
          </Col>
          <Col
            md={4}
            classNamRowe="media bg-white shadow-sm rounded align-items-center text-sm"
          >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <Menu {...menus[2]}></Menu>
                </Link>
              </Card>
            </Fade>
          </Col>
          <br></br>
          <br></br>
          <Col
            md={4}
            classNamRowe="media bg-white shadow-sm rounded align-items-center text-sm"
            >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <Menu {...menus[3]}></Menu>
                </Link>
              </Card>
            </Fade>
          </Col>
          <Col
            md={4}
            classNamRowe="media bg-white shadow-sm rounded align-items-center text-sm"
            >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <Menu {...menus[4]}></Menu>
                </Link>
              </Card>
            </Fade>
          </Col>
          <Col
            md={4}
            classNamRowe="media bg-white shadow-sm rounded align-items-center text-sm"
            >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <Menu {...menus[5]}></Menu>
                </Link>
              </Card>
            </Fade>
          </Col>
        </Row>

       
      </div>
    );
  };

  const DishList = () => {
    return (
      <div className="container-fluid my-3">
        <h2>Featured Dishes</h2>
        <Row>
          {dishes.map((dish) => {
            const {
              DishId,
              HomeCookID,
              DishName,
              Price,
              IsAvailable,
              Description,
              ImageURL,
            } = dish;
            return (
              <Col md={4} key={DishId}>
                <Fade in>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={ImageURL}
                      alt={DishId}
                      className="img-fluid menu-dish-img rounded"
                    />
                    <CardBody>
                      <CardTitle>
                        <h3>{DishName}</h3>
                      </CardTitle>
                      <CardText>
                        DishID: {dish.DishId}
                        HomeCookID: {HomeCookID}
                        Price:{Price}
                        IsAvailable:{IsAvailable}
                        Description:{Description}
                      </CardText>
                    </CardBody>
                  </Card>
                </Fade>
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
      {menus == null ? null : <MenuList />}
      <DishList />
    </div>
  );
}
export default Home;
