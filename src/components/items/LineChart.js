import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from "../../api";
import { Table } from "reactstrap";
//Line chart

export default function LineChart() {
    let [orders, setorders] = useState([]);
    const getOrders = async () => {
        await api.getSevenOrder().then((response) => {
            setorders(response);
            console.log(orders);
        })
    };
    useEffect(() => {
        getOrders();
    },[]);
    // let total=[];
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
    var count =0;
    return (
        <div className="chart">
            <h3>Sales Analytics</h3>
            <Line data={Linedata} options={options} />
            
        </div>
    )
}


