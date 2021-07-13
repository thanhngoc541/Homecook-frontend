import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useState } from 'react';
import api from '../../api';
export const Items = ({ orderID }) => {

    const [modal, setModal] = useState(true);
    const toggle = () => setModal(!modal);


    //D0B05EAC-8C40-416E-9283-F13B787FB908
    const [items, setItems] = useState([]);
    const[order, setOrder]= useState([]);
    const getOrder= async () => {
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
    const {Total, OrderID} = order;
    const sum=0;
    function getTotalPrice(a) {
        sum += a;
        return sum;
    }
    return (
        // <div className="items" style={{ overflowX: "auto", width: "100%" }}>
            <Table striped style={{ backgroundColor: "white", width:"900px", height:"350px" , borderRadius:"15px", fontFamily: "'Lexend Deca', sans-serif" }} hover>
                <thead>
                    <tr style={{fontSize:"25px"}}>
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
                            <td style={{paddingLeft: "47px"}}>{Quantity}</td>
                            <td>{Dish.Price}</td>
                            <td>{TotalPrice}</td>
                        </tr>
                    );               
                })}
                <tr style={{width: "100%"}}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><h3>Total</h3></td>
                    <td><h3>${Total}</h3></td>
                    <hr/>
                </tr>
            </Table>

        // </div>
    );
};
export default Items;