import React, { useState } from "react";
import "../../styles/admin.css";
import AdminStats from "./AdminStats";
import AdminUsers from "./AdminUsers";
import AdminKiosks from "./AdminKiosks";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <div className="admin-container">

      <h2 className="title">Admin Dashboard</h2>

      {/* Top Navigation Tabs */}
      <div className="admin-tabs">
        <button
          className={activeTab === "stats" ? "tab active" : "tab"}
          onClick={() => setActiveTab("stats")}
        >
          Overview
        </button>

        <button
          className={activeTab === "users" ? "tab active" : "tab"}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>

        <button
          className={activeTab === "kiosks" ? "tab active" : "tab"}
          onClick={() => setActiveTab("kiosks")}
        >
          Kiosks
        </button>
      </div>

      {/* Page Content */}
      {activeTab === "stats" && <AdminStats />}
      {activeTab === "users" && <AdminUsers />}
      {activeTab === "kiosks" && <AdminKiosks />}

    </div>
  );
}
