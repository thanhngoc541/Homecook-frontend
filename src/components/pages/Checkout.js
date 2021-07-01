import React, { useState } from "react";
import { Container, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import DatePicker from "react-datepicker";
import addDays from "date-fns/subDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import getDay from "date-fns/getDay";
import getTime from "date-fns/getTime";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../items/context";
import CartItem from "../items/CartItem";
import { date } from "check-types";
import { useForm } from "react-hook-form";
import api from "../../api/index";

export default function Checkout() {
  const { cart, total } = useGlobalContext();
  const [startDate, setStartDate] = useState(
    // setHours(setMinutes(new Date(), 0), 8)
    setHours(setMinutes(setSeconds(new Date(), 0), 0), 8)
  );

  const { register, handleSubmit } = useForm();

  const districts = [
    " 1",
    " 2",
    " 3",
    " 4",
    " 5",
    " 6",
    " 7",
    " 8",
    " 9",
    " 10",
    " 11",
    " 12",
    " Tan Binh",
    " Binh Thanh",
    " Phu Nhuan",
    " Go Vap",
  ];
  if (districts !== " 1" || districts !== " 3" || districts !== " 10") {
    // total= total + 30;
  }
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    currentDate.setTime(currentDate.getTime() + 2 * 60 * 60 * 1000);
    return currentDate.getTime() < selectedDate.getTime();
  };

  // this.state ={
  //     currentDate: new Date().toLocaleString(),
  // }
  let monday = new Date();
  monday.setDate(monday.getDay(2));
  let toFriday = new Date();
  toFriday.setDate(toFriday.getDay(5));
  // function DateTime() {
  //     const [startDate, setStartDate] = useState(new Date());
  //     return (

  //     );
  // }

  const onSubmit =  (values) => {
    let OrderValues = {
      ...values,
      ReceiverAddress:
        values.ReceiverAddress + " district:" + values.ReceiverDistrict,
      OrderDate: startDate,
      TimeStamp: new Date(),
      Status: "Pending",
      Total: total,
      OrderItems: cart,
    };
    delete OrderValues.ReceiverDistrict;

    // Cast format to POJO
      OrderValues.OrderItems = OrderValues.OrderItems.map((item) => {
        const { quantity, ...dish } = item;
        return {
          ItemID: item.DishId,
          Quantity: quantity,
          HomeCookID: item.HomeCookID,
          Dish: dish,
          TotalPrice: quantity * item.Price,
        };
      });
    
    console.log(OrderValues);
    // alert(OrderValues);

    // const result = await api.createOrder(OrderValues);
    // alert(result);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col lg="6">
            {cart.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
            <h4 className="price">
              Total <span>${total}</span>
            </h4>
          </Col>
          <Col lg="6">
            <div className="checkout">
              <div className="checkout-container">
                <h3 className="heading-3">Checkout Page</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup className="input">
                    <Label className="input-label" for="ReceiverName">
                      Full Name:
                    </Label>
                    <Input
                      className="input-field"
                      type="text"
                      name="Name"
                      id="Name"
                      placeholder="Enter your name"
                      {...register("ReceiverName", { required: true })}
                    />
                  </FormGroup>
                  <FormGroup className="input">
                    <Label className="input-label" for="ReceiverPhone">
                      Phone Number:
                    </Label>
                    <Input
                      className="input-field"
                      type="text"
                      name="Phone"
                      id="Phone"
                      placeholder="Enter your phone number"
                      {...register("ReceiverPhone", { required: true })}
                    />
                  </FormGroup>
                  <Row>
                    <Col xs="8">
                      <FormGroup className="input xs-6">
                        <Label className="input-label" for="ReceiverAddress">
                          Address:
                        </Label>
                        <Input
                          className="input-field"
                          type="text"
                          name="Address"
                          id="Address"
                          placeholder="Enter your address"
                          {...register("ReceiverAddress", { required: true })}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup className="input xs-6">
                        <Label className="input-label" for="District">
                          District
                        </Label>
                        <Input
                          className="input-field"
                          type="select"
                          name="district"
                          id="District"
                          {...register("ReceiverDistrict")}
                        >
                          {districts.map((district) => {
                            return <option>{district}</option>;
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="input">
                    <Label className="input-label" for="Date">
                      Order Date
                    </Label>
                    <br />
                    <DatePicker
                      class="fa fa-calendar"
                      dateFormat="dd-MM-yyyy pp"
                      selected={startDate}
                      filterDate={isWeekday}
                      filterTime={filterPassedTime}
                      minTime={setHours(setMinutes(new Date(), 0), 8)}
                      maxTime={setHours(setMinutes(new Date(), 0), 21)}
                      // minDate= {new Date()}
                      minDate={new Date()}
                      maxDate={toFriday}
                      onChange={(date) => setStartDate(date)}
                      locale="pt-BR"
                      showTimeSelect
                      timeFormat=" p "
                      timeIntervals={60}
                      placeholderText=""
                    />
                  </FormGroup>
                  <FormGroup className="input">
                    <Label className="input-label" for="Note">
                      Note:
                    </Label>
                    <Input
                      className="input-field"
                      type="textarea"
                      name="Note"
                      id="Note"
                      placeholder="Enter note"
                      {...register("Note", { required: true })}
                    />
                  </FormGroup>
                  <button type="submit" className="checkout-btn">
                    Place Order
                  </button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
