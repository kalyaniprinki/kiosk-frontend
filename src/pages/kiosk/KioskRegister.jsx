import React, { useState } from "react";
import "../../styles/form.css";

export default function KioskRegister() {
  const [form, setForm] = useState({
    kioskName: "",
    location: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister(e) {
    e.preventDefault();
    console.log("Kiosk registering:", form);
    window.location.href = "/kiosk/login";
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Register Kiosk</h1>
        <p className="form-subtitle">Create kiosk terminal account</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="kioskName"
            placeholder="Kiosk Name"
            value={form.kioskName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Kiosk Location"
            value={form.location}
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
          <p>Already registered?</p>
          <a className="link" href="/kiosk/login">Login</a>
        </div>

      </div>
    </div>
  );
}
