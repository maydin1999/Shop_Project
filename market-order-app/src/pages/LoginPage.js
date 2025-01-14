import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5043/api/users/login", loginData);

      localStorage.setItem("userId", response.data.Id); // Kullanıcı ID'sini kaydet
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
