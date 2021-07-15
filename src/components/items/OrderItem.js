import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import api from '../../api';
export const Items = ({ orderID }) => {

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
    return (
        // <div className="items" style={{ overflowX: "auto", width: "100%" }}>
        <Table striped style={{ backgroundColor: "white", width: "900px", height: "350px", borderRadius: "15px", fontFamily: "'Lexend Deca', sans-serif" }} hover>
            <thead>
                <tr style={{ fontSize: "25px" }}>
                    <th scope="row"></th>
                    <th scope="row">Dish Name</th>
                    <th scope="row">Quantity</th>
                    <th scope="row">Price</th>
                    <th scope="row">Total</th>
                </tr>
            </thead>
            {items.map((item) => {
                const {
                    ItemID,
                    Quantity,
                    Dish,
                    TotalPrice
                } = item;
                return (
                    <tr key={ItemID}>
                        <td><img src={Dish.ImageURL} style={{ width: "100px", height: "100px" }} /></td>
                        <td>{Dish.DishName}</td>
                        <td style={{ paddingLeft: "47px" }}>{Quantity}</td>
                        <td>{Dish.Price}</td>
                        <td>{TotalPrice}</td>
                    </tr>
                );
            })}
            <tr style={{ width: "100%" }}>
                <td></td>
                <td></td>
                <td></td>
                <td><h3>Total</h3></td>
                <td><h3>${Total}</h3></td>
                <hr />
            </tr>
            {/* <tr>
                <td>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CancelIcon>Cancel</CancelIcon>}
                    >
                        Cancel
                    </Button>
                </td>
            </tr> */}
        </Table >

        // </div>
    );
};
export default Items;