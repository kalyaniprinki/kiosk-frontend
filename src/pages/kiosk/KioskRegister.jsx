import React, { useState } from "react";
import "../../styles/form.css";

export default function KioskRegister() {
  const [form, setForm] = useState({
    kioskName: "",
    location: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/kiosk/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess(`Kiosk registered! Your Kiosk ID: ${data.kioskId}`);

      setTimeout(() => {
        window.location.href = "/kiosk/login";
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Register Kiosk</h1>
        <p className="form-subtitle">Create kiosk terminal account</p>

        {error && <p className="error-box">{error}</p>}
        {success && <p className="success-box">{success}</p>}

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
