import React, { useState } from "react";
import "../../styles/form.css";

export default function KioskLogin() {
  const [form, setForm] = useState({
    kioskId: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    console.log("Kiosk logging in:", form);
    window.location.href = "/kiosk/dashboard";
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Kiosk Login</h1>
        <p className="form-subtitle">Login to access kiosk panel</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="kioskId"
            placeholder="Enter Kiosk ID"
            value={form.kioskId}
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
          <p>No kiosk account?</p>
          <a className="link" href="/kiosk/register">Register Kiosk</a>
        </div>

      </div>
    </div>
  );
}
