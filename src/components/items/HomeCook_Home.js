import React from "react";
import HomeCookInfo from "./HomeCook_Info";
import LineChart from "./LineChart.js";
import OrderMain from "../pages/HomeCook_Order";
export default function DashboardHome({HomeCookID}) {

    return (
        <div className="dashboard-home">
            <h2 className="ml-3" >Welcome homecook!</h2>
            <HomeCookInfo HomeCookID={HomeCookID}/>

            <div className="featured">
                <div className="featuredItem p-0 mt-3">
                    <OrderMain HomeCookID={HomeCookID} orderPerPage={6} status="Pending"/>
                </div>
            </div>
            <LineChart />
        </div>
    );
}