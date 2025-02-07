import React, { useState } from "react";
import "./loginPage.css";
import useAuth from "../../context/useAuthStore";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { login, register } = useAuth();

  //handle login Input
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle Register Input
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle login submit
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginFormData);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  //handle register submit
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    console.log("Register form data:", registerFormData);
    try {
      await register(registerFormData);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login or Register</h1>

      {!showRegisterForm ? (
        <form onSubmit={handleSubmitLogin}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            value={loginFormData.email}
            onChange={handleLoginInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={handleLoginInputChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <p>Don't have an account?</p>
          <button onClick={() => setShowRegisterForm(true)}>Register</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitRegister}>
          <h2>Register</h2>
          <input
            type="text"
            name="username"
            value={registerFormData.username}
            onChange={handleRegisterInputChange}
            placeholder="username"
            required
          />
          <input
            type="email"
            name="email"
            value={registerFormData.email}
            onChange={handleRegisterInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={registerFormData.password}
            onChange={handleRegisterInputChange}
            placeholder="Password"
            required
          />
          {/* <input
            type="password"
            name="confirmPassword"
            value={registerFormData.confirmPassword}
            onChange={handleRegisterInputChange}
            placeholder="Confirm Password"
            required
          /> */}
          <button type="submit">Register</button>
          <p>Already have an account?</p>
          <button onClick={() => setShowRegisterForm(false)}>Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
