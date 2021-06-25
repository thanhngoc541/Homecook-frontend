import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Nav, Collapse, NavItem, NavLink } from "reactstrap";
//----------------------------------
const StatusBar = ({ statuses, filterOrders }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar color="light" light expand="md" className="bg-grey">
            <NavbarBrand className="order-navbar-brand" href="/">
                Status
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {statuses.map((status, index) => {
                        return (
                          <NavItem key={index} className="order-nav-item">
                            <NavLink onClick={() => filterOrders(status)}>
                              {status}
                            </NavLink>
                          </NavItem>
                        );
                    })}
                </Nav>
            </Collapse>
        </Navbar>
    );
};
export default StatusBar;

