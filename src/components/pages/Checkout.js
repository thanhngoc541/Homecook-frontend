import React, { useState } from "react";
import { Container, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import getDay from "date-fns/getDay";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../items/context";
import CartItem from "../items/CartItem";
import { useForm } from "react-hook-form";
import api from "../../api/index";
import Swal from "sweetalert2";

export default function Checkout() {
  const { clearCart, cart, total } = useGlobalContext();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(setSeconds(new Date(), 0), 0), 8)
  );

  const { register, handleSubmit } = useForm();

  //--------------Set up Datepicker
  const isWeekday = (date) => {
    const day = getDay(date);
    let weekday = [];
    for (var i = 0; i <= 6; i++) {
      if (day <= 6) weekday += i;
    }
    return weekday;
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    currentDate.setTime(currentDate.getTime() + 2 * 60 * 60 * 1000);
    return currentDate.getTime() < selectedDate.getTime();
  };
  //---------Chia order theo homecookID
  let map = new Map();
  cart.forEach((item) => {
    if (!map.has(item.HomeCookID)) {
      map.set(item.HomeCookID, []);
      map.get(item.HomeCookID).push(item);
    } else {
      map.get(item.HomeCookID).push(item);
    }
  });

  const createOrder = (OrderValues) => {
    api.createOrder(OrderValues).then((response) => {
      if (!!response.headers.get("Location")) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Your order has been placed!",
        });
      }
    });
  };

  const onSubmit = (values) => {
    let OrderValues = null;
    var myDate = new Date();
    var timeStamp = Date.parse(myDate) / 1000.0;
    var orderDate = Date.parse(startDate) / 1000.0;
    //---- item la key trong map
    for (let item of map.keys()) {
      OrderValues = {
        CustomerID: "2cd366cf-ec5e-4091-ac0e-c63c9ca3f2d3",
        HomeCookID: item,
        OrderDate: {
          seconds: orderDate,
          nanos: 0,
        },
        TimeStamp: {
          seconds: timeStamp,
          nanos: 0,
        },
        // OrderDate: ""+orderDate+"",
        // TimeStamp: ""+timeStamp+"",
        ...values,
        //-- tra ve value cua key
        OrderItems: map.get(item),
        ReceiverAddress:
          values.ReceiverAddress,
        // OrderDate: startDate,
        // TimeStamp: new Date(),
        Total: total,
      };
      // Cast format to POJO
      OrderValues.OrderItems = OrderValues.OrderItems.map((item) => {
        const { quantity, ...dish } = item;
        return {
          Quantity: quantity,
          Note: values.Note,
          TotalPrice: quantity * item.Price,
          Dish: dish,
        };
      });
      delete OrderValues.ReceiverDistrict;
      console.log(OrderValues);
      createOrder(OrderValues);
    }
  };
  //------------Google api address
  let autoComplete;
  let address1Field;

  // function initAutocomplete()
  window.initAutocomplete = function () {
    address1Field = document.querySelector("#Address");

    autoComplete = new window.google.maps.places.Autocomplete(address1Field, {
      componentRestrictions: { country: ["vn"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    });
    address1Field.focus();
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autoComplete.addListener("place_changed", fillInAddress);
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autoComplete.getPlace();
    let address1 = "";
    let locality = "";
    let administrative_area_level_1 = "";
    let country = "";
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          address1 = `${component.long_name} ${address1}`;
          break;
        }

        case "route": {
          address1 += component.long_name;
          break;
        }
        case "locality":
          locality = `${component.long_name} ${locality}`;
          break;

        case "administrative_area_level_1": {
          administrative_area_level_1 = `${component.long_name} ${administrative_area_level_1}`;
          break;
        }
        case "country":
          country = `${component.long_name} ${country}`;
          break;
        default:
          break;
      }
    }
    address1Field.value = address1 + locality + administrative_area_level_1 + country;
    console.log(address1);
    console.log(address1Field.value);
    // postalField.value = postcode;
    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    // address2Field.focus();
  }
  return (

    <div>
      <Container id="address-form" action="" method="get" autoComplete="off">
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
                  <Row>
                    <Col xs="8">
                      <FormGroup className="input">
                        {/* <Label className="input-label" for="ReceiverName">
                          *Full Name:
                        </Label>
                        <Input
                          className="input-field"
                          type="text"
                          name="Name"
                          id="Name"
                          placeholder="Full name"
                          {...register("ReceiverName", { required: true })}
                        /> */}
                        <TextField fullWidth="100%" autoComplete="off" id="standard-search Name" label="*Full Name" type="text" variant="filled" {...register("ReceiverName", { required: true })} />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup className="input">
                        {/* <Label className="input-label" for="ReceiverPhone">
                          *Phone Number:
                        </Label>
                        <Input
                          className="input-field"
                          type="text"
                          name="Phone"
                          id="Phone"
                          placeholder="Phone number"
                          {...register("ReceiverPhone", { required: true })}
                        /> */}
                        <TextField color="primary" autoComplete="off" id="standard-search Phone" label="*Phone" type="text" variant="filled" {...register("ReceiverPhone", { required: true })} />
                      </FormGroup>

                    </Col>
                  </Row>
                  <Row>
                    <Col id="autocomplete">
                      <label className="full-field input field">
                        {/* <span className="form-label">Deliver to*</span>
                        <input
                          id="Address"
                          name="Address"
                          required
                          autocomplete="off"
                          {...register("ReceiverAddress", { required: true })}
                        /> */}
                        <TextField color="primary" autoComplete="off" id="Address" name="Address" label="*Deliver to" type="text" variant="filled" {...register("ReceiverAddress", { required: true })} />
                      </label>

                    </Col>
                  </Row>
                  <FormGroup className="input">
                    <Label className="input-label" for="Date">
                      *Order Date
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
                      minDate={new Date()}
                      onChange={(date) => setStartDate(date)}
                      // locale="pt-BR"
                      showTimeSelect
                      timeFormat=" p "
                      timeIntervals={60}
                      placeholderText=""
                    />
                  </FormGroup>
                  <FormGroup className="input">
                    {/* <Label className="input-label" for="Note">
                      Note:
                    </Label>
                    <Input
                      style={{ resize: "none", height: "170pxz" }}
                      className="input-field"
                      type="textarea"
                      name="Note"
                      id="Note"
                      placeholder="Enter note"
                      {...register("Note", { required: true })}
                    /> */}
                    <TextField
                      id="outlined-multiline-static Note"
                      label="Note"
                      multiline
                      rows={4}
                      fullWidth= "100%"
                      variant="outlined"
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

// <form id="address-form" action="" method="get" autocomplete="off">
//   <p className="title">Sample address form for North America</p>
//   <p className="note"><em>* = required field</em></p>
//   <label class="full-field">

//     <span className="form-label">Deliver to*</span>
//     <input
//       id="ship-address"
//       name="ship-address"
//       required
//       autocomplete="off"
//     />
//   </label>
//   <label className="full-field">
//     <span className="form-label">City*</span>
//     <input id="locality" name="locality" required />
//   </label>
//   <label className="slim-field-left">
//     <span className="form-label">State/Province*</span>
//     <input id="state" name="state" required />
//   </label>
//   <label className="full-field">
//     <span className="form-label">Country/Region*</span>
//     <input id="country" name="country" required />
//   </label>
//   <button type="button" className="my-button">Save address</button>
//   <input type="reset" value="Clear form" />
// </form>
