import React from "react";
import FeaturedInfo from "./FeaturedInfo";
import LineChart from "./LineChart.js";
export default function DashboardHome() {
    
    return (
        <div className="dashboard-home">
            <FeaturedInfo />
            <LineChart/>
        </div>
    );
}