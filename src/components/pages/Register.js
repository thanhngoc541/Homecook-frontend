import React from "react";
import RegisterForm from "../items/RegisterForm";
<<<<<<< HEAD
import { Fade } from "react-animation-components";
=======
import api from "../../api/index";
import Swal from "sweetalert2";
>>>>>>> 0404318 (Register success)

function Register() {
  const register = async (data) => {
    try {
      const res = await api.register(data);
      if (res.ok) {
        console.log("Register success");
        Swal.fire(
          "Successfully registered!",
          `Welcome!! ${data.FullName}`,
          "success"
        );
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
<<<<<<< HEAD
    <Fade className="w-100 h-100" in>
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <RegisterForm />
      </div>
    </Fade>
=======
    <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
      <RegisterForm registerAccount={register} />
    </div>
>>>>>>> 0404318 (Register success)
  );
}

export default Register;
