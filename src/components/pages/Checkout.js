import React, { useState } from 'react';
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import DatePicker from "react-datepicker";
import subDays from 'date-fns/subDays';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../items/context';
import CartItem from "../items/CartItem";
export default function Checkout() {
    const { cart, total } = useGlobalContext();
    const [startDate, setStartDate] = useState(new Date());
    // function DateTime() {
    //     const [startDate, setStartDate] = useState(new Date());
    //     return (

    //     );
    // }
    return (
        <div>
            <Container>
                <Row>
                    <Col xs="6">{cart.map((item) => {
                        return <CartItem key={item.id} {...item} />;
                    })}
                        <h4 className="price">Total <span>${total}</span></h4></Col>
                    <Col xs="6">
                        <div className="checkout">
                            <div className="checkout-container">
                                <h3 className="heading-3">Checkout Page</h3>
                                <Form>
                                    <FormGroup className="input">
                                        <Label className="input-label" for="ReceiverName">Receiver Name:</Label>
                                        <Input className="input-field" type="text" name="Name" id="ReceiverName" placeholder="Enter your name"></Input>
                                    </FormGroup>
                                    <FormGroup className="input">
                                        <Label className="input-label" for="ReceiverPhone">Receiver Phone Number:</Label>
                                        <Input className="input-field" type="text" name="Phone" id="ReceiverPhone" placeholder="Enter your phone number"></Input>
                                    </FormGroup>
                                    <h4>Cho nay de chon location</h4>

                                    <FormGroup className="input">
                                        <Label className="input-label" for="Date">Order Date</Label>
                                        <br />
                                        <DatePicker selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            minDate={subDays(new Date(), 0)}
                                            placeholderText="Select a date after 5 days ago" />

                                    </FormGroup>
                                    <FormGroup className="input">
                                        <Label className="input-label" for="Note">Note:</Label>
                                        <Input className="input-field" type="textarea" name="Note" id="Note" placeholder="Enter note"></Input>
                                    </FormGroup>
                                    <button className="checkout-btn">
                                        Place Order
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

