import React, { useState } from "react";
import LoginForm from "../items/LoginForm";

function Login() {
  const adminUser = {
    email: "admin@admin.com",
    password: "123",
  };
  const [user, setUser] = useState({ username: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        username: details.name,
        email: details.email,
      });
    } else {
      console.log("Details do not match");
      setError("Details do not match");
    }
  };

  const Logout = () => {
    console.log("Logout");
    setUser({ username: "", email: "" });
    console.log(user);
  };
  return (
    <>
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <LoginForm Login={Login} error={error} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
