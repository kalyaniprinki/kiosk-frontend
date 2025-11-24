import React, { useState } from "react";
import "../../styles/form.css";

export default function UserLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();

    // Later you will replace this with API request
    console.log("User logging in:", form);

    // Temporary redirect
    window.location.href = "/user/dashboard";
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
