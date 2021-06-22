import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { useState } from 'react';

export const Items = ( {showModal, setShowModal}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [items, setItems]= useState([]);
    const [loading, setLoading]= useState(true);

    // const url=""
    // if (loading) {
    //     return (
    //       <setion>
    //         <h1>Loading...</h1>
    //       </setion>
    //     )
    //   }
    return (
        <div>
        <Button color="info" onClick={toggle}>Info</Button>
        <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={toggle} style={{ marginTop: "75px" }}>
            <ModalHeader toggle={toggle}>
            <image src="https://wallpaperaccess.com/full/1727351.jpg" alt="Menu Pics" className="img-fluid" /> 
                Image
            </ModalHeader>

            
            <ModalBody>
                <Table borderless size="sm">
                    <thead>
                        <tr style={{position:"sticky"}}>
                            <th>Stt</th>
                            <th>Dish Name</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tr>
                        <th scope="row" style={{paddingLeft:"8px"}}>1</th>
                        <td style={{paddingLeft:"4px"}}>Hu Tieu</td>
                        <td style={{paddingLeft:"30px"}}>5</td>
                        <td>500.000</td>
                    </tr>
                    <tr>
                        <th scope="row" style={{paddingLeft:"8px"}}>1</th>
                        <td style={{paddingLeft:"4px"}}>Hu Tieu</td>
                        <td style={{paddingLeft:"30px"}}>5</td>
                        <td>500.000</td>
                    </tr>
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