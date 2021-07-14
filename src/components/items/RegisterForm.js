import { Card } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button, CardBody, Row } from "reactstrap";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    // Login(details);
    console.log(data);
  };

  return (
    <div className="regis-wrapper regis-wrapper--w680">
      <Card className="card-4">
        <CardBody className="card-body">
          <h2 className="title mb-5">Registration Form</h2>
          <Form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <Row className="row-space">
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">first name</label>
                  <input
                    className="input--style-4"
                    type="text"
                    name="first_name"
                    {...register("firstname", {
                      required: "This is required",
                      maxLength: {
                        value: 12,
                        message: "You exceeded the max length",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="text-danger">{errors.username.message}</p>
                  )}
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">last name</label>
                  <input
                    className="input--style-4"
                    type="text"
                    name="last_name"
                    {...register("lastname", {
                      required: "This is required",
                      maxLength: {
                        value: 20,
                        message: "You exceeded the max length",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="text-danger">{errors.username.message}</p>
                  )}
                </FormGroup>
              </div>
            </Row>
            <Row className="row-space">
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">Birthday</label>
                  <div className="input-group-icon">
                    <input
                      className="input--style-4"
                      type="text"
                      name="birthday"
                    />
                    <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                  </div>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="input-group row">
                  <label className="label col-12">Gender</label>
                  <div className="p-t-10 col-12">
                    <label className="radio-container m-r-45">
                      Male
                      <input type="radio" checked="checked" name="gender" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="radio-container">
                      Female
                      <input type="radio" name="gender" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </FormGroup>
              </div>
            </Row>
            <Row className="space">
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">Email Address</label>
                  <input className="input--style-4" type="email" name="email" />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="input-group">
                  <label className="label">Phone Number</label>
                  <input className="input--style-4" type="text" name="phone" />
                </FormGroup>
              </div>
            </Row>
            <Row className="space">
              <div className="col-md-12">
                <FormGroup className="input-group row">
                  <label className="label col-12">Your Address</label>
                  <div className="col-12">
                    <input
                      className="input--style-4 w-100"
                      type="text"
                      name="address"
                    />
                  </div>
                </FormGroup>
              </div>
            </Row>
            <div className="p-t-15">
              <Button
                color="primary"
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
