import React from "react";
import HomeCookInfo from "./HomeCook_Info";
import LineChart from "./LineChart.js";
import OrderMain from "../pages/HomeCook_Order";
import { Line } from 'react-chartjs-2';
export default function DashboardHome({ HomeCookID }) {

    const Linedata = {
        labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: '# of Orders',
                data: [],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <div className="dashboard-home">
            <h2 className="ml-3" >Welcome homecook!</h2>
            <HomeCookInfo HomeCookID={HomeCookID} />

            {/* <div className="featured">
                <div className="featuredItem p-0 mt-3">
                    <OrderMain HomeCookID={HomeCookID} orderPerPage={6} status="Pending"/>
                </div>
            </div> */}
            {/* <LineChart /> */}
            <div>
                <h2>Sales Statistics</h2>
                <Line data={Linedata} options={options} />
            </div>

        </div>
    );
}