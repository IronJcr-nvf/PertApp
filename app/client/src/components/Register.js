/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import axios from "axios";
import ImageContent from "../assets/images/login.png";
import "../assets/styles/Register.css";

function Sign() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/api/user/register", {
      name: formData.username,  // اسم المستخدم
      familyName: formData.username, // الاسم العائلي
      email: formData.email,  // البريد الإلكتروني
      password: formData.password, // كلمة المرور
    });

    console.log("User registered successfully:", response.data);
    // Redirect or update UI as needed
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
    console.error(err.response?.data);  // طباعة تفاصيل الخطأ لتشخيصه
  }
};



  return (
    <>
      <div className="sign-content">
        <div className="imageContent">
          <h1>Pert App For Your Business</h1>
          <br />
          <br />
          <img src={ImageContent} alt="Pert App" />
        </div>
        <div className="form-content">
          <h1>Create Account</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
          <p>
            Already have an account? <a href="#sign-Up">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Sign;
