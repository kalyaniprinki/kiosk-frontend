import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/index.css";   // adjust path if needed

export default function WelcomeScreen() {
  const [registerRole, setRegisterRole] = useState("");
  const navigate = useNavigate();

  const handleRegisterSelect = (e) => {
    const role = e.target.value;
    setRegisterRole(role);
    if (role) {
      navigate(`/${role}/register`);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">

        <h1 className="title">Smart Printing Kiosk</h1>
        <p className="subtitle">Fast • Easy • Touch-Free Printing</p>

        <img
          className="hero-image"
          src="https://cdn-icons-png.flaticon.com/512/3103/3103472.png"
          alt="Kiosk Illustration"
        />

        <div className="buttons">

          {/* Login Section */}
          <h3 className="section-label">Login</h3>

          <Link className="btn user" to="/user/login">
            User Login
          </Link>

          <Link className="btn admin" to="/admin/login">
            Admin Login
          </Link>

          <Link className="btn kiosk" to="/kiosk/login">
            Kiosk Login
          </Link>

          {/* Register Section */}
          <h3 className="section-label" style={{ marginTop: 25 }}>
            Register As
          </h3>

          <select
            className="dropdown"
            value={registerRole}
            onChange={handleRegisterSelect}
          >
            <option value="">-- Select Role --</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="kiosk">Kiosk</option>
          </select>
        </div>
      </div>
    </div>
  );
}
