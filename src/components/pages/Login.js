import React, { useState } from "react";
import LoginForm from "../items/LoginForm";
import api from "../../api/index";
import Swal from "sweetalert2";
import { Router, Redirect } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState(null);

  const Login = async (data) => {
    console.log(data);
    try {
      const userData = await api.login(data);
      if (!!userData) {
        setUser(userData);
        console.log("Logged in");
        console.log(user);
        //----------- Toast
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "success",
          title: `Welcome back, ${userData.FullName}`,
        });
        //------------ End Toast
        //Store user in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(userData));
        let millisecondsToWait = 1500;
        setTimeout(() => {
          //TODO: phan role de push new location
          if (userData.Role === "customer") props.history.push("/");
          if (userData.Role === "admin") props.history.push("/dashboard");
          if (userData.Role === "homecook")
            props.history.push(
              "/homecook/6ABE8D62-72D2-4F13-B790-C35EA529365B"
            );
          // props.history.push(`/homecook/${userData.UserID}`);
        }, millisecondsToWait);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your username or password is wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Some thing went wrong!",
      });
    }
  };

  const Logout = () => {
    console.log("Logout");
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <>
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <LoginForm Login={Login} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
