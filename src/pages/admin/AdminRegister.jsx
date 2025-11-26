import React, { useState } from "react";
import "../../styles/form.css";
import api from "../../api/api"; // axios instance

export default function AdminRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/admin/register", form);
      const data = res.data;


      if (!data.success) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Admin registered successfully!");

      // Redirect to login after short delay
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 1500);

    } catch (err) {
      console.error("Register Error:", err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Admin Registration</h1>
        <p className="form-subtitle">Create administrator account</p>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

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

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
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
