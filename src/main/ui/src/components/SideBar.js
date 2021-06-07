import React, { useState } from "react";
import { Nav, Navbar, NavItem, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

function SideBar(props) {
  
  return (
    <>
      <Navbar className="nav-menu" vertical>
        <Nav className="nav-menu-items" navbar>
          <NavItem className="nav-text ">
            <NavLink className="nav-link px-3" to="/home">
              <i className="fa fa-home fa-lg mx-2" aria-hidden="true"></i>
              <span>Home</span>
            </NavLink>
          </NavItem>
          <NavItem className="nav-text">
            <NavLink className="nav-link px-3" to="/menu">
              <i className="fa fa-cutlery fa-lg mx-2" aria-hidden="true"></i>
              <span>Menu</span>
            </NavLink>
          </NavItem>
          <NavItem className="nav-text">
            <NavLink className="nav-link px-3" to="/order">
              <i
                className="fa fa-shopping-cart fa-lg mx-2"
                aria-hidden="true"
              ></i>
              <span>Order</span>
            </NavLink>
          </NavItem>
          <NavItem className="nav-text">
            <NavLink className="nav-link px-3" to="/setting">
              <i className="fa fa-sliders fa-lg mx-2" aria-hidden="true"></i>
              <span>Setting</span>
            </NavLink>
          </NavItem>
          <NavItem className="nav-text">
            <NavLink className="nav-link px-3" to="/login">
              <i className="fa fa-sign-in fa-lg mx-2" aria-hidden="true"></i>
              <span>Login</span>
            </NavLink>
          </NavItem>
          <NavItem className="nav-text">
            <NavLink className="nav-link px-3" to="/login">
              <img src="assests/images/logout.jpg" height ='100px'/>
              
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}
export default SideBar;
