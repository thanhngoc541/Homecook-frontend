import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { data } from "browserslist";
import { Button } from "bootstrap";

export default function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    setDetails(data);
    console.log(details);
    Login(details);
    console.log(data);
  };
  return (
    <div class="wrap-login100">
      <Form
        onSubmit={handleSubmit((data) => submitHandler(data))}
        className="login100-form validate-form p-l-55 p-r-55 p-t-178"
      >
        <span class="login100-form-title">Sign In</span>
        {/* ERROR! */}
        {error !== "" ? <div className="error">{error}</div> : ""}
        <FormGroup className="wrap-input100 validate-input m-b-16">
          <Label htmlFor="username">Name:</Label>
          <Input
            className="input100"
            type="text"
            id="username"
            {...register("username", {
              required: "This is required",
              maxLength: { value: 12, message: "You exceeded the max length" },
            })}
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </FormGroup>
        <FormGroup className="wrap-input100 validate-input">
          <Label htmlFor="email">Email:</Label>
          <Input
            className="input100"
            type="email"
            id="email"
            {...register("email")}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            className="input100"
            type="password"
            id="password"
            {...register("password")}
          />
        </FormGroup>
        <FormGroup className="container-login100-form-btn">
          <button className="login100-form-btn" type="submit">
            Submit
          </button>
        </FormGroup>
        <div class="flex-col-c p-t-170 p-b-40">
          <span class="txt1 p-b-9">Don’t have an account?</span>
          <a href="#" class="txt3">
            Sign up now
          </a>
        </div>
      </Form>
    </div>
  );
}
