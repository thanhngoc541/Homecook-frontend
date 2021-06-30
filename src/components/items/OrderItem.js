import React, { useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { useState } from 'react';
import api from '../../api';

export const Items = ({ orderID,popup }) => {

    const [modal, setModal] = useState(popup);
    const toggle = () => setModal(!modal);


    //D0B05EAC-8C40-416E-9283-F13B787FB908
    const [items, setItems] = useState([]);
    const getItem = async () => {
        await api.getOrderItems(orderID).then((response) => {
            setItems(response);
        })
    };
    useEffect(() => {
        getItem();
        console.log(items);
    }, []);
    console.log(items);
    const count = 0;
    return (
        <div>

            <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                toggle={toggle} style={{ marginTop: "75px" }}>
                <ModalHeader toggle={toggle}>
                    <image src="https://wallpaperaccess.com/full/1727351.jpg" alt="Menu Pics" className="img-fluid" />
                    {orderID}
                </ModalHeader>
                <ModalBody>
                    <Table borderless size="sm">
                        <thead>
                            <tr style={{ position: "sticky" }}>
                                <th>Stt</th>
                                <th>Dish Name</th>
                                <th>Quantity</th>
                                <th>Total</th>
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
                                    <th scope="row" style={{ paddingLeft: "8px" }}>{count + 1}</th>
                                    <td style={{ paddingLeft: "4px" }}>{Dish.DishName}</td>
                                    <td style={{ paddingLeft: "30px" }}>{Quantity}</td>
                                    <td>{TotalPrice}</td>
                                </tr>
                            );
                        })}
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default Items;