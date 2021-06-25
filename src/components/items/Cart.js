import React from 'react'
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

export default function Cart() {
    return (
      <>
        <Navbar light expand="md" className="container shadow-sm">
          <Nav navbar className="ml-auto">
            <NavItem>
              <Button>
                <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </>
    );
}
