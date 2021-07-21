import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import api from '../../api';
export const Items = ({ orderID, address, name, close }) => {

    const [modal, setModal] = useState(true);
    const toggle = () => setModal(!modal);


    const [items, setItems] = useState([]);
    const [order, setOrder] = useState([]);
    const getOrder = async () => {
        await api.getOrderById(orderID).then((response) => {
            setOrder(response);
        })
    };
    const getItem = async () => {
        await api.getOrderItems(orderID).then((response) => {
            setItems(response);
        })
    };
    useEffect(() => {
        getItem();
        getOrder();

        console.log(items);
        console.log(order);
    }, []);
    console.log(items);
    const { Total, OrderID } = order;
    const sum = 0;
    function getTotalPrice(a) {
        sum += a;
        return sum;
    }
    //--------
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: "Red",
        },
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();
    let count = 0;
    let quantities = 0;
    return (
        <div className="d-flex align-items-start flex-column bd-highlight mb-3" style={{ backgroundColor: "floralwhite", padding: "0 1rem", width: "80vh", height: "50vh", borderRadius: "15px", fontFamily: "Lexend Deca, sans-serif" }}>
            <div className="d-flex flex-row-reverse bd-highlight">
                <button onClick={() => close()} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'transparent', fontSize: '30px' }} type="button" className="close p-2 bd-highlight" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <h2 className="mt-3 font-weight-bold" style={{ fontWeight: "bold" }}>Order Details</h2>
            <div className="d-flex p-2 bd-highlight">Name: {name}</div>
            <div className="d-flex p-2 bd-highlight">Address: {address}</div>

            <Table striped hover>
                <thead>
                    <tr>
                        <th style={{ fontWeight: "bold" }}>#</th>
                        <th style={{ fontWeight: "bold" }}>Dish Name</th>
                        <th style={{ fontWeight: "bold" }}>Quantity</th>
                        <th style={{ fontWeight: "bold" }}>Price</th>
                        <th style={{ fontWeight: "bold" }}>Total</th>
                    </tr>
                </thead>
                {items.map((item) => {
                    const {
                        ItemID,
                        Quantity,
                        Dish,
                        TotalPrice
                    } = item;
                    count += 1;
                    quantities += Quantity;
                    return (
                        <tr key={ItemID}>
                            <th>{count}</th>
                            <td>{Dish.DishName}</td>
                            <td style={{ paddingLeft: "47px" }}>{Quantity}</td>
                            <td>${Dish.Price}</td>
                            <td>${TotalPrice}</td>
                        </tr>
                    );
                })}
            </Table >
            <div className="mt-auto ml-auto p-3 bd-highlight" style={{fontSize:"1.4rem"}}>
                <div className="">
                    <span className="" style={{ fontWeight: "bold" }}>Total quantity: </span>
                    <span className="">{quantities}</span>
                </div>
                <div className="">
                    <span className="" style={{ fontWeight: "bold" }}>Total money: </span>
                    <span className="">${Total}</span>
                </div>
            </div>

        </div>
    );
};
export default Items;