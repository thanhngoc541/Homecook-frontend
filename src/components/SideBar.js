import React, { useState } from "react";
import { Nav, Navbar, NavItem, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

function SideBar(props) {
  return (
    <>
      <Navbar className="sidebar-nav-menu" >
        <Nav className="sidebar-nav-menu-items" navbar vertical>
          <NavItem className="sidebar-nav-text ">
            <NavLink className="nav-link px-3" to="/home">
              <i className="fa fa-home fa-lg mx-1" aria-hidden="true"></i>
              <span>Home</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidebar-nav-text">
            <NavLink className="nav-link px-3" to="/menu">
              <i className="fa fa-cutlery fa-lg mx-1" aria-hidden="true"></i>
              <span>Menu</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidebar-nav-text">
            <NavLink className="nav-link px-3" to="/order">
              <i
                className="fa fa-shopping-cart fa-lg mx-1"
                aria-hidden="true"
              ></i>
              <span>Order</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidebar-nav-text">
            <NavLink className="nav-link px-3" to="/setting">
              <i className="fa fa-sliders fa-lg mx-1" aria-hidden="true"></i>
              <span>Setting</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidebar-nav-text">
            <NavLink className="nav-link px-3" to="/login">
              <i className="fa fa-sign-in fa-lg mx-1" aria-hidden="true"></i>
              <span>Login</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}
export default SideBar;
