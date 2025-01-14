import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      console.log("Register Data:", registerData);

      const response = await axios.post("http://localhost:5043/api/users/register", registerData);
      alert("Registration successful!");
      console.log("Registered User Data:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Register error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">Join us for an amazing experience</p>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="First Name"
            value={registerData.firstName}
            onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
            className="auth-input"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={registerData.lastName}
            onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="auth-link-button"
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
