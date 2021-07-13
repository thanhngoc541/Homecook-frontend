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
      {user.email !== "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.username}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </>
  );
}
export default Login;
