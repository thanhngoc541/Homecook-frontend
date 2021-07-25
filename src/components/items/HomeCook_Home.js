import React, { useState, useEffect } from "react";
import HomeCookInfo from "./HomeCook_Info";
import api from "../../api/index";
import LineChart from "./LineChart.js";
import OrderMain from "../pages/HomeCook_Order";
import { Line } from 'react-chartjs-2';
export default function DashboardHome({ HomeCookID }) {
    const [sales, setSales] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const countSales = (id) => {
        api.getOrderByWeek(id).then((res) => {
            setSales(res);
            console.log(sales);
        })
    }
    useEffect(() => {
        countSales(userData.UserID);
    }, [])
    const Linedata = {
        labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: '# of Orders',
                data: sales,
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
        <div className="dashboard-home my-3 px-3">
            <h2 className="ml-3">Welcome {userData?.FullName}!</h2>
            <HomeCookInfo HomeCookID={HomeCookID} />
            <div className="dashboard-home my-3 ">
                <h2 className="ml-3">Sales Statistics</h2>
                <Line data={Linedata} options={options} />
            </div>
        </div>
    );
}