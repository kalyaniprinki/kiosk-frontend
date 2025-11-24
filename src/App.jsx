import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomeScreen from "./components/WelcomeScreen";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Reports from "./pages/admin/Reports";

// User
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import Upload from "./pages/user/Upload";

// Kiosk
import KioskLogin from "./pages/kiosk/KioskLogin";
import KioskRegister from "./pages/kiosk/KioskRegister";
import KioskDashboard from "./pages/kiosk/KioskDashboard";
import QRPage from "./pages/kiosk/QRPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<WelcomeScreen />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/reports" element={<Reports />} />

        {/* User */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/upload" element={<Upload />} />

        {/* Kiosk */}
        <Route path="/kiosk/login" element={<KioskLogin />} />
        <Route path="/kiosk/register" element={<KioskRegister />} />
        <Route path="/kiosk/dashboard" element={<KioskDashboard />} />
        <Route path="/kiosk/qr" element={<QRPage />} />

      </Routes>
    </BrowserRouter>
  );
}
