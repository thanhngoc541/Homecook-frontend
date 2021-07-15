import React from "react";
import HomeCookInfo from "./HomeCook_Info";
import LineChart from "./LineChart.js";
import OrderHomeCook from "../pages/HomeCook_Order";
export default function DashboardHome() {

    return (
        <div className="dashboard-home">
            <h2 className="ml-3" >Welcome homecook!</h2>
            <HomeCookInfo />

            <div className="featured">
                <div className="featuredItem p-0 mt-3">
                    <OrderHomeCook orderPerPage={6}/>
                </div>
            </div>
            <LineChart />
        </div>
    );
}