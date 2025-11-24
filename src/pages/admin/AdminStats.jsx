import React from "react";

export default function AdminStats() {
  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Users</h3>
        <p className="stat-number">124</p>
      </div>

      <div className="stat-card">
        <h3>Active Kiosks</h3>
        <p className="stat-number">8</p>
      </div>

      <div className="stat-card">
        <h3>Print Jobs Today</h3>
        <p className="stat-number">57</p>
      </div>

      <div className="stat-card">
        <h3>Revenue Today</h3>
        <p className="stat-number">₹ 910</p>
      </div>

    </div>
  );
}
