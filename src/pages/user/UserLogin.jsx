import React, { useState } from "react";
import "../../styles/form.css";
import api from "../../api/api";

export default function UserLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/user/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Login Response:", res.data);

      // Save the token if backend returns JWT
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect to dashboard
      window.location.href = "/user/dashboard";

    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">User Login</h1>
        <p className="form-subtitle">Access your printing account</p>

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
