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
import DishList from "./DishList";

import dishData from "../dishData";
  
function Home(props) {
  const [dishes, setDishes] = useState(dishData);
  
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
          <Col
            md={4}
            className="media bg-white shadow-sm rounded align-items-center text-sm"
          >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <CardBody className="row p-2">
                    <Col md={2} className="bg-light rounded p-3 mx-3">
                      <CardImg
                        width="100%"
                        src="assests/images/burgerking.png"
                        alt="demo"
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={{ size: "auto" }} className="mx-3 py-2">
                      <CardTitle>
                        <strong>Burger King</strong>
                      </CardTitle>
                      <CardText className="small">
                        <i
                          className="fa fa-star text-warning mr-1"
                          aria-hidden="true"
                        ></i>
                        <span>0.8</span> (873)
                        <i
                          className="fa fa-usd ml-3 mr-1 text-success"
                          aria-hidden="true"
                        ></i>
                        <span>6.2</span>
                      </CardText>
                    </Col>
                  </CardBody>
                </Link>
              </Card>
            </Fade>
          </Col>
          <Col
            md={4}
            className="media bg-white shadow-sm rounded align-items-center text-sm"
          >
            <Fade in>
              <Card className="p-0">
                <Link to={`/restaurant`}>
                  <CardBody className="row p-2">
                    <Col md={2} className="bg-light rounded p-3 mx-3">
                      <CardImg
                        width="100%"
                        src="assests/images/burgerking.png"
                        alt="demo"
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={{ size: "auto" }} className="mx-3 py-2">
                      <CardTitle>
                        <strong>Burger King</strong>
                      </CardTitle>
                      <CardText className="small">
                        <i
                          className="fa fa-star text-warning mr-1"
                          aria-hidden="true"
                        ></i>
                        <span>0.8</span> (873)
                        <i
                          className="fa fa-usd ml-3 mr-1 text-success"
                          aria-hidden="true"
                        ></i>
                        <span>6.2</span>
                      </CardText>
                    </Col>
                  </CardBody>
                </Link>
              </Card>
            </Fade>
          </Col>
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
