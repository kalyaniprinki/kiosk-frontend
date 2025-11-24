import React, { useState } from "react";
import "../../styles/form.css";

export default function AdminLogin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    console.log("Admin logging in:", form);
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Admin Login</h1>
        <p className="form-subtitle">Administrator access only</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Enter Admin Username"
            value={form.username}
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
          <p>Need an Admin account?</p>
          <a className="link" href="/admin/register">Register Admin</a>
        </div>

      </div>
    </div>
  );
}
