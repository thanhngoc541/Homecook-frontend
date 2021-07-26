import React from "react";
import FeaturedInfo from "./FeaturedInfo";

import LineChart from "./LineChart.js";
export default function DashboardHome() {

    return (
        <div className="dashboard-home">
            <h1>Welcome Admin</h1>
            <FeaturedInfo />
            <LineChart />
        </div>
    );
}