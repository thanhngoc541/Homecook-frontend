import { Card } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button, CardBody, Row, CardHeader,Col } from "reactstrap";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import api from "../../api/index";

function RegisterForm({ registerAccount }) {
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const DoB = () => {
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        isClearable
        placeholderText="I have been cleared!"
      />
    );
  };

  const submitHandler = (data) => {
    data.DoB = startDate;
    data.FullName = `${data.lastname} ${data.firstname}`;
    delete data.lastname;
    delete data.firstname;
    registerAccount(data);
  };

  return (
    <div className="regis-wrapper regis-wrapper--w680 ">
      <Card className="card-4">
        <CardHeader className="d-flex justify-content-center p-5 form-card-header">
          Registration Form
        </CardHeader>
        <CardBody className="card-body">
          <Form onSubmit={handleSubmit((data) => submitHandler(data))}>
            {/* Username & Password */}
            <Row className="space">
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">Username</label>
                  <input
                    className="input--style-4"
                    type="text"
                    {...register("Username", {
                      required: "This is required",
                      maxLength: {
                        value: 20,
                        message: "You exceeded the max length",
                      },
                      minLength: {
                        value: 6,
                        message: "Minimum is 6 characters",
                      },
                    })}
                  />
                  {errors.Username && (
                    <p className="text-danger">{errors.Username.message}</p>
                  )}
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">Password</label>
                  <input
                    className="input--style-4"
                    type="password"
                    {...register("Password", {
                      required: "This is required",
                      pattern: {
                        value: /^[A-Za-z0-9]{6,12}/,
                        message:
                          "Your password must between 6 to 12 characters",
                      },
                    })}
                  />
                  {errors.Password && (
                    <p className="text-danger">{errors.Password.message}</p>
                  )}
                </FormGroup>
              </div>
            </Row>
            {/* First Name & Last name */}
            <Row className="row-space">
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">first name</label>
                  <input
                    className="input--style-4"
                    type="text"
                    {...register("firstname", {
                      required: "This is required",
                      maxLength: {
                        value: 12,
                        message: "You exceeded the max length",
                      },
                    })}
                  />
                  {errors.firstname && (
                    <p className="text-danger">{errors.firstname.message}</p>
                  )}
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">last name</label>
                  <input
                    className="input--style-4"
                    type="text"
                    {...register("lastname", {
                      required: "This is required",
                      maxLength: {
                        value: 20,
                        message: "You exceeded the max length",
                      },
                    })}
                  />
                  {errors.lastname && (
                    <p className="text-danger">{errors.lastname.message}</p>
                  )}
                </FormGroup>
              </div>
            </Row>
            {/* Role  */}
            <Row className="row-space">
              <Col md={6}>
                <FormGroup className="input-group row">
                  <label className="label col-12">You are</label>
                  <div className="p-t-10 col-12">
                    <label className="radio-container mr-3">
                      Customer
                      <input
                        {...register("Role", { required: true })}
                        type="radio"
                        value="customer"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="radio-container">
                      HomeCook
                      <input
                        {...register("Role", { required: true })}
                        type="radio"
                        value="homecook"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </FormGroup>
              </Col>
            </Row>
            {/* Dob and Phone */}
            <Row className="row-space">
              <div className="col-md-6">
                <FormGroup className="input-group row">
                  <label className="label col-12 mb-3">Birthday</label>
                  <div className="input-group-icon">
                    <DoB />
                  </div>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">Phone Number</label>
                  <input
                    className="input--style-4"
                    type="text"
                    {...register("PhoneNumber", {
                      required: true,
                    })}
                  />
                </FormGroup>
              </div>
            </Row>
            {/* Email */}
            <Row className="space">
              <FormGroup className="input-group row">
                <div className="col-12">
                  <label className="label">Email Address</label>
                </div>
                <div className="col-12">
                  <input
                    className="input--style-4 w-100"
                    type="email"
                    {...register("Email", {
                      required: true,
                    })}
                  />
                </div>
              </FormGroup>
            </Row>
            {/* Address */}
            <Row className="space">
              <div className="col-md-12">
                <FormGroup className="input-group row">
                  <label className="label col-12">Your Address</label>
                  <div className="col-12">
                    <input
                      className="input--style-4 w-100"
                      type="text"
                      {...register("Address", {
                        required: true,
                      })}
                    />
                  </div>
                </FormGroup>
              </div>
            </Row>

            {/* Buttons */}
            <div className="p-t-15">
              <Button
                color="success"
                className="px-5 py-2 border-radius"
                type="submit"
              >
                Submit
              </Button>
            </div>
            <div className="d-flex flex-column p-t-15">
              <span className="txt1 p-b-9">Already have an account?</span>
              <Link to="/login" className="regis-txt3 mt-1">
                Sign in now
              </Link>
              <Link to="/home" className="regis-txt3 mt-3">
                Back to home
              </Link>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default RegisterForm;
