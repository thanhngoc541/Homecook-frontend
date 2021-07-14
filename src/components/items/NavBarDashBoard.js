import React, { useState } from "react";
import LineStyleIcon from '@material-ui/icons/LineStyle';
import DashboardHome from "./DashboardHome";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import CustomerList from "../wrappers/CustomerList";
import HomecookList from "../wrappers/HomecookList";
import OrderAdmin from "../pages/OrderAdmin";
import {Row, Col} from "reactstrap";
export default function NavBarDashBoard() {
    let [selected, setSelected] = useState("dashboard");
    const main = () => {
        if (selected === "home") return <DashboardHome />
        if (selected === "customer") return <CustomerList />
        if (selected === "homecook") return <HomecookList/>
        if (selected === "order") return <OrderAdmin/>
    }
    return (
        <div>
            <Row>
                <Col xs="3">
                <div className="dashboard-sidebar">
                    <h2>Admin Dashboard</h2>
                    <div className="dashboard-sidebarWrapper">
                        <div className="dashboard-sidebarMenu">
                            <h3 className="dashboard-sidebarTitle">Dashboard</h3>
                            <ul className="dashboard-sidebarList">
                                <li className="dashboard-sidebarListItem">
                                    <DashboardIcon fontSize="large"/>
                                    <button className="btnDashboard" onClick={() => setSelected("home")}><h4>Home</h4></button>
                                </li>
                            </ul>
                            <h3 className="dashboard-sidebarTitle">Users</h3>
                            <ul className="dashboard-sidebarList">
                                <li className="dashboard-sidebarListItem">
                                    <PeopleAltIcon fontSize="large"/>
                                    <button className="btnDashboard" onClick={() => setSelected("customer")}><h4>Customer</h4></button>
                                </li>
                                <li className="dashboard-sidebarListItem">
                                    <RestaurantIcon fontSize="large"/>
                                    <button className="btnDashboard" onClick={() => setSelected("homecook")}><h4>Homecook</h4></button>
                                </li>
                            </ul>
                            <h3 className="dashboard-sidebarTitle">Orders</h3>
                            <ul className="dashboard-sidebarList">
                                <li className="dashboard-sidebarListItem">
                                    <ShoppingCartIcon fontSize="large"/>
                                    <button className="btnDashboard" onClick={() => setSelected("order")}><h4>Order</h4></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </Col>
                <Col xs="9">
                {main()}
                </Col>        
            </Row>
        </div>
    );
}