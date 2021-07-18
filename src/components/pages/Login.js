import React, { useState } from "react";
import LoginForm from "../items/LoginForm";
import api from "../../api/index";
import Swal from "sweetalert2";
import { Fade } from "react-animation-components";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState(null);

  const Login = async (data) => {
    console.log(data);
    try {
      const userData = await api.login(data);
      if (!!userData) {
        setUser(userData);
        console.log("Logged in");
        //Store user in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(userData));
        let millisecondsToWait = 1500;
        setTimeout(() => {
          //TODO: phan role de push new location
          if (userData.Role === "customer") props.history.push("/");
          if (userData.Role === "admin") props.history.push("/dashboard");
          if (userData.Role === "homecook")
            props.history.push(
              "/homecook"
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

  return (
    <>
      <Fade className="w-100 h-100" in>
        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <LoginForm Login={Login} />
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}
export default withRouter(Login);
