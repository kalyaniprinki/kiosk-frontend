import React, { useState } from "react";
import "../../styles/form.css";
import api from "../../api/api"; // axios instance with deployed backend URL

export default function UserLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      // POST request to deployed backend: /user/login
      const res = await api.post("/user/login", {
        email: form.email,
        password: form.password
      });

      const data = res.data;
      console.log("Login Response:", data);

      // Save token if backend provides it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect to dashboard
      window.location.href = "/user/dashboard";

    } catch (err) {
      console.error("Login error:", err);

      // Backend error message
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">User Login</h1>
        <p className="form-subtitle">Access your printing account</p>

        {error && <p className="error-box">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>

        <div className="form-footer">
          <p>Don't have an account?</p>
          <a className="link" href="/user/register">Create Account</a>
        </div>

      </div>
    </div>
  );
}
