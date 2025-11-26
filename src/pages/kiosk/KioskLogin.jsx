import React, { useState } from "react";
import "../../styles/form.css";
import api from "../../api/api"; // use the axios instance

export default function KioskLogin() {
  const [form, setForm] = useState({
    kioskId: "",
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
      // ✅ Use api instance (points to deployed backend)
      const res = await api.post("/kiosk/login", form);


      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("KIOSK_TOKEN", data.token);
      localStorage.setItem("KIOSK_ID", form.kioskId);

      // Redirect
      window.location.href = "/kiosk/dashboard";

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Kiosk Login</h1>
        <p className="form-subtitle">Login to access kiosk panel</p>

        {error && <p className="error-box">{error}</p>}

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
