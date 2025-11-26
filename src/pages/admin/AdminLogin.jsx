import React, { useState } from "react";
import "../../styles/form.css";
import api from "../../api/api"; // axios instance

export default function AdminLogin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Axios returns parsed JSON automatically
      const { data } = await api.post("/admin/login", form);

     

      // Save token in localStorage
      localStorage.setItem("admin_token", data.token);

      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard";

    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="form-container">
      <div className="form-box">

        <h1 className="form-title">Admin Login</h1>
        <p className="form-subtitle">Administrator access only</p>

        {error && <p className="error-msg">{error}</p>}

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

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
