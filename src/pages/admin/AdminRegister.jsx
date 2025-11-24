import React, { useState } from "react";
import "../../styles/form.css";

export default function AdminRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister(e) {
    e.preventDefault();
    console.log("Admin registering:", form);
    window.location.href = "/admin/login";
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Admin Registration</h1>
        <p className="form-subtitle">Create administrator account</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Admin Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn-primary" type="submit">
            Register
          </button>
        </form>

        <div className="form-footer">
          <p>Already an admin?</p>
          <a className="link" href="/admin/login">Login</a>
        </div>

      </div>
    </div>
  );
}
