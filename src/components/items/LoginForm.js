import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function LoginForm({ Login }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    Login(data);
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit((data) => submitHandler(data))}
        className="login100-form validate-form"
      >
        <span class="login100-form-title">Sign In</span>
        <FormGroup className="wrap-input100 validate-input mt-5 mb-3">
          <label className="label mx-1">
            <strong>Username</strong>
          </label>
          <Input
            className="input100"
            type="text"
            id="username"
            placeholder="Username"
            {...register("Username", {
              required: "This is required",
              maxLength: { value: 20, message: "You exceeded the max length" },
            })}
          />
          {errors.Username && (
            <p className="text-danger">{errors.Username.message}</p>
          )}
        </FormGroup>

        <FormGroup className="wrap-input100 validate-input mb-1">
          <label className="label mx-1">
            <strong>Password</strong>
          </label>
          <Input
            className="input100"
            type="password"
            id="password"
            placeholder="Password"
            {...register("Password")}
          />
        </FormGroup>
        <div class="text-right p-t-13 p-b-23">
          <span class="txt1">Forgot</span>

          <a href="#" class="txt2 mx-1">
            Username or Password?
          </a>
        </div>
        <FormGroup className="container-login100-form-btn my-1">
          <button className="login100-form-btn" type="submit">
            Submit
          </button>
        </FormGroup>
        <div className="d-flex flex-column align-items-center pt-7 pb-5">
          <span className="txt1 p-b-9">Don’t have an account?</span>
          <Link to="/signup" className="txt3 mt-1">
            Sign up now
          </Link>
          <Link to="/home" className="txt3 mt-3">
            Back to home
          </Link>
        </div>
      </Form>
    </>
  );
}
