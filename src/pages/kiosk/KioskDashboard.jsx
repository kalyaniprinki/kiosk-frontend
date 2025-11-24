import React, { useState } from "react";
import "../../styles/kiosk.css";
import KioskQR from "./KioskQR";
import KioskConnected from "./KioskConnected";

export default function KioskDashboard() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  function simulateConnection() {
    // TEMP — simulate user scanning QR
    const fakeUser = {
      name: "Kalyani",
      email: "kalyani@example.com",
    };

    const fakeFiles = [
      { id: 1, name: "Assignment.pdf", size: "230 KB" },
      { id: 2, name: "Photo.png", size: "540 KB" },
    ];

    setUser(fakeUser);
    setFiles(fakeFiles);
    setConnected(true);
  }

  return (
    <div className="kiosk-container">

      <h2 className="title">Kiosk Dashboard</h2>

      <div className="status-box">
        <span className={`status-dot ${connected ? "online" : "offline"}`}></span>
        {connected ? (
          <p>Connected to <b>{user.name}</b></p>
        ) : (
          <p>Waiting for user…</p>
        )}
      </div>

      {!connected && (
        <KioskQR onSimulateConnect={simulateConnection} />
      )}

      {connected && (
        <KioskConnected
          user={user}
          files={files}
        />
      )}

    </div>
  );
}
