import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/Login.css";
import ImageLogin from "../assets/images/login.png";

const Login = () => {
  const [formData, setFormData] = useState({
  email: "",
  password: ""
});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", formData, {
        withCredentials: true,
      });
      console.log("Logged in:", response.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Something went wrong");
    }
};

  return (
    <div className="loginContent">
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please log in to your account</p>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <div className="login-footer">
            <span>Don't have an account? <a href="/SignIn">Sign Up</a></span>
          </div>
        </div>
        <div className="login-image">
          <img src={ImageLogin} alt="Login" className="ImageLogin"/>
        </div>
      </div>
    </div>
  );
};

export default Login;
