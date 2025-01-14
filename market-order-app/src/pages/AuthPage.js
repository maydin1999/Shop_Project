import React, { useState } from "react";
import axios from "axios";
import "./AuthPage.css"; // Harici CSS dosyası eklendi

const AuthPage = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5043/api/users", registerData);
      alert("Registration successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Register error:", error.response?.data?.message || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
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
      </div>
    </div>
  );
};

export default AuthPage;
