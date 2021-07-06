import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Nav, Collapse, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
//----------------------------------
const StatusBar = ({ statuses, filterOrders }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [filterState, setFilterState] = useState('All');
    return (

        <Navbar style={{backgroundColor: "slategrey"}} bg="dark" color="grey" light expand="md" className="">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {/* <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {filterState}
                        </DropdownToggle>
                        <DropdownMenu right>
                            {statuses.map((status, index) => {
                                return (
                                    <DropdownItem key={index} onClick={() => {filterOrders(status); setFilterState(status)}}>
                                        {status}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </UncontrolledDropdown> */}
                    {statuses.map((status, index) => {
                        return (
                            <NavItem style={{margin: "0 auto"}}>
                                <NavLink key={index} onClick={() => {filterOrders(status); setFilterState(status)}}>{status}</NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
            </Collapse>
        </Navbar>
    );
};
export default StatusBar;
