import React, { useState } from "react";
import { Container, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import getDay from "date-fns/getDay";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../items/context";
import { withRouter } from "react-router-dom";
import CartItem from "../items/CartItem";
import { useForm } from "react-hook-form";
import api from "../../api/index";
import Swal from "sweetalert2";
import CartMenuItem from "../items/CartMenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Translate } from "@material-ui/icons";
import { Scale } from "chart.js";


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

function Checkout(props) {
  const { resetCart, cart, total } = useGlobalContext();
  let [shipping, setShipping] = useState(30);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(setSeconds(new Date(), 0), 0), 8)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const createOrder = async (OrderValues) => {
    console.log(OrderValues);
    try {
      const homecook = await api.getAccountByID(OrderValues.HomeCookID);
      const response = await api.createOrder(OrderValues);
      console.log(homecook.token);
      setTimeout(() => {
        if (response.ok) {
          let datas = {
            title: "New Order",
            message: "You have received new order. Check it out!!!",
          }
          let NotifcationValues = {
            data: datas,
            to: homecook.token,
          }
          resetCart();
          Toast.fire({
            icon: "success",
            title: "Your order has been placed!",
          });
          api.sendNotification(NotifcationValues).then((res) => {
            console.log(NotifcationValues);
            console.log(res);
          })
          props.history.push("/home");
        } else throw Error("response is not ok!");

      }, 5000);
    } catch (err) {
      console.warn("Place order error: ", err.message)
    }

  };

  const onSubmit = (values) => {
    let OrderValues = null;
    var myDate = new Date();
    var timeStamp = Date.parse(myDate) / 1000.0;
    var orderDate = Date.parse(startDate) / 1000.0;
    const userData = JSON.parse(sessionStorage.getItem("user"));

    //---------Chia order theo homecookID
    let mapDish = new Map();
    let mapMenu = new Map();
    cart.MenuItem.forEach((menu) => {
      if (!mapMenu.has(menu.HomeCookID)) {
        mapMenu.set(menu.HomeCookID, []);
        mapMenu.get(menu.HomeCookID).push(menu);
      } else {
        mapMenu.get(menu.HomeCookID).push(menu);
      }
    });
    cart.DishItem.forEach((dish) => {
      if (!mapDish.has(dish.HomeCookID)) {
        mapDish.set(dish.HomeCookID, []);
        mapDish.get(dish.HomeCookID).push(dish);
      } else {
        mapDish.get(dish.HomeCookID).push(dish);
      }
    });
    console.log(cart.DishItem);
    console.log(cart.MenuItem);
    //--------------------------------------------
    if (!!mapDish) {
      //---- item la key trong map
      for (let item of mapDish.keys()) {
        OrderValues = {
          CustomerID: userData.UserID,
          HomeCookID: item,
          OrderDate: {
            seconds: orderDate,
            nanos: 0,
          },
          TimeStamp: {
            seconds: timeStamp,
            nanos: 0,
          },
          ...values,
          //-- tra ve value cua key
          OrderItems: mapDish.get(item),
          OrderMenus: null,
          ReceiverAddress: values.ReceiverAddress,
          Total: total,
          IsMenu: false,
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
        // const homecook = api.getAccountByID(OrderValues.HomeCookID);
        console.log(OrderValues);

        createOrder(OrderValues);
      }
    }
    if (!!mapMenu) {
      for (let item of mapMenu.keys()) {
        OrderValues = {
          CustomerID: userData.UserID,
          HomeCookID: item,
          OrderDate: {
            seconds: orderDate,
            nanos: 0,
          },
          TimeStamp: {
            seconds: timeStamp,
            nanos: 0,
          },
          ...values,
          //-- tra ve value cua key
          OrderMenus: mapMenu.get(item),
          OrderItems: null,
          ReceiverAddress: values.ReceiverAddress,
          Total: total,
          IsMenu: true,
        };
        // Cast format to POJO
        OrderValues.OrderMenus = OrderValues.OrderMenus.map((item) => {
          const { quantity, ...menu } = item;
          return {
            Quantity: quantity,
            Note: values.Note,
            TotalPrice: quantity * item.Price,
            Menu: menu,
          };
        });
        delete OrderValues.OrderMenus.Dishes;
        delete OrderValues.ReceiverDistrict;
        console.log(OrderValues);
        const homecook = api.getAccountByID(OrderValues.HomeCookID);
        createOrder(OrderValues, homecook);
      }
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
  };

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
    address1Field.value =
      address1 + locality + administrative_area_level_1 + country;
    console.log(locality);
    console.log(address1);
    console.log(address1Field.value);
    // postalField.value = postcode;
    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    // address2Field.focus();
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
      "& .MuiFormLabel-root": {
        color: "black",
      },
    },
  }));
  const classes = useStyles();
  //-------------
  // const handleOnChange = () => {
  //   var ship = document.getElementById("Address");
  //   console.log(ship);
  //   if (document.getElementById("Address").value.indexOf("District 1") > -1) {
  //     document.getElementById("shipping").value(10)
  //     setShipping(30);
  //   }
  // }
  return (
    <div>
      <Container
        className="my-3"
        id="address-form"
        action=""
        method="get"
        autoComplete="off"
      >
        <Row>
          <Col lg="6">
            <header className="cart-header">

              {/* //-------------Col  6 cart */}
              <h3>Your Cart</h3>
            </header>
            <div className="cart-items my-3">
              {cart.MenuItem?.length > 0 && <h6>Menu List</h6>}
              {cart.MenuItem.map((item) => {
                return <CartMenuItem key={item.id} {...item} />
              })}
              {cart.DishItem?.length > 0 && <h6>Dishes List</h6>}
              {cart.DishItem.map((item) => {
                return <CartItem key={item.id} {...item} />
              })}
            </div>
            <h4 className="price">
              Total <span>${total}</span>
            </h4>
          </Col>

          {/* Checkout */}
          <Col lg="6" className={classes.root}>
            <div className="checkout">
              <div className="checkout-container">
                <h3 className="heading-3">Checkout Page</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col xs="12" sm="6" xl="8">
                      <FormGroup className="order-input">
                        <h6>*Receiver Name</h6>
                        <TextField
                          placeholderText="Name above 6 character"
                          fullWidth="100%"
                          autoComplete="off"
                          id="outlined-helperText Name"
                          label=""
                          type="text"
                          variant="filled"
                          {...register("ReceiverName", {
                            required: "This is required",
                            maxLength: {
                              value: 20,
                              message:
                                "Your Receiver Name must not longer than 20 characters",
                            },
                          })}
                        />
                        {errors.ReceiverName && (
                          <p className="text-danger">
                            {errors.ReceiverName.message}
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" xl="4">
                      <FormGroup className="order-input">
                        <h6>*Receiver Phone</h6>
                        <TextField
                          color="primary"
                          fullWidth="100%"
                          autoComplete="off"
                          id="standard-search Phone"
                          label=""
                          type="text"
                          variant="filled"
                          {...register("ReceiverPhone", {
                            required: "This is required",
                            pattern: {
                              value: /^[0-9\b]+$/,
                              message: "Must contain number only",
                            },
                            maxLength: {
                              value: 10,
                              message:
                                "Phone number must not longer than 10 numbers",
                            },
                          })}
                        />
                        {errors.ReceiverPhone && (
                          <p className="text-danger">
                            {errors.ReceiverPhone.message}
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" lg="12">
                      <FormGroup>
                        <label
                          id="autocomplete"
                          className="order-full-field order-input field w-100"
                        >
                          <h6>*Deliver to</h6>
                          <TextField
                            color="primary"
                            autoComplete="off"
                            fullWidth="100%"
                            id="Address"
                            name="Address"
                            type="text"
                            variant="filled"
                            // onChange={handleOnChange}
                            {...register("ReceiverAddress", {
                              required: "This is required",
                            })}
                          />
                          {errors.ReceiverAddress && (
                            <p className="text-danger">
                              {errors.ReceiverAddress.message}
                            </p>
                          )}
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12" lg="6">
                      <span id="shipping">Shipping: {shipping}</span>
                      <FormGroup className="order-input">
                        <Label className="order-input-label date" for="Date">
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
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" lg="12">
                      <FormGroup className="order-input order-note">
                        <h6>*Note</h6>
                        <TextField
                          id="outlined-multiline-static Note"
                          label=""
                          multiline
                          rows={4}
                          fullWidth="100%"
                          variant="outlined"
                          {...register("Note", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
export default withRouter(Checkout);