import React from "react";
import RegisterForm from "../items/RegisterForm";
import { Fade } from "react-animation-components";

function Register() {
  return (
    <Fade className="w-100 h-100" in>
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <RegisterForm />
      </div>
    </Fade>
  );
}

export default Register;
