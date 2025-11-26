import React, { useState } from "react";
import "../../styles/form.css";
import api from "../../api/api";

export default function UserRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await api.post("/user/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log("Register Response:", res.data);

      alert("Account created successfully!");

      // Optional: Save token immediately if backend returns one
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      window.location.href = "/user/login";

    } catch (error) {
      console.error("Register Error:", error);
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Create User Account</h1>
        <p className="form-subtitle">Register to use printing services</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
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
          <p>Already have an account?</p>
          <a className="link" href="/user/login">Login</a>
        </div>

      </div>
    </div>
  );
}
