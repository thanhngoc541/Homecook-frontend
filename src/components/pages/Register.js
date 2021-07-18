import React from "react";
import RegisterForm from "../items/RegisterForm";
import { Fade } from "react-animation-components";
import api from "../../api/index";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

function Register(props) {
  const register = async (data) => {
    try {
      const userData = await api.register(data);
      if (!!userData) {
        console.log("Register success");
        console.log(userData);
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
          title: `Welcome, ${userData.FullName}`,
        });
        //------------ End Toast
        //Store user in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(userData));
        props.history.push("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your username or email is taken!",
      });
    }
  };

  return (
    <Fade className="w-100 h-100" in>
      <div className=" page-wrapper font-poppins container-login100">
        <RegisterForm registerAccount={register} />
      </div>
    </Fade>
  );
}

export default withRouter(Register);
