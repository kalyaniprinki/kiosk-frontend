import React, { useState } from "react";
import "../../styles/userdashboard.css";

export default function UserDashboard() {
  const [wallet, setWallet] = useState(120); // Sample balance
  const [connected, setConnected] = useState(false);
  const [kioskId, setKioskId] = useState(null);

  const [files, setFiles] = useState([
    { id: 1, name: "Document1.pdf", size: "240 KB" },
    { id: 2, name: "Notes.docx", size: "120 KB" },
  ]);

  function handleConnect() {
    // TEMP — simulate connection
    setConnected(true);
    setKioskId("KIOSK-44A2");
  }

  function handlePrint(fileId) {
    alert("Printing file ID: " + fileId);
  }

  return (
    <div className="dash-container">

      {/* HEADER */}
      <div className="dash-header">
        <h2>User Dashboard</h2>

        <div className="status-box">
          <span
            className={`status-dot ${connected ? "online" : "offline"}`}
          ></span>
          {connected ? (
            <p>Connected to <b>{kioskId}</b></p>
          ) : (
            <p>Not Connected</p>
          )}
        </div>
      </div>

      {/* TOP ACTION BAR */}
      <div className="top-actions">
        <div className="wallet-card">
          <p className="label">Wallet Balance</p>
          <h3>₹ {wallet}</h3>
        </div>

        <button className="connect-btn" onClick={handleConnect}>
          {connected ? "Connected" : "Connect to Kiosk"}
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="action-grid">
        <a className="action-card" href="/user/upload">
          <div className="icon-circle">⬆</div>
          <p>Upload File</p>
        </a>

        <a className="action-card" href="/user/files">
          <div className="icon-circle">📄</div>
          <p>My Files</p>
        </a>

        <a className="action-card" href="/user/kiosk">
          <div className="icon-circle">🔗</div>
          <p>Kiosk Link</p>
        </a>
      </div>

      {/* FILE LIST SECTION */}
      <h3 className="section-title">Recently Uploaded Files</h3>

      <div className="file-list">
        {files.map((file) => (
          <div className="file-row" key={file.id}>
            <div>
              <p className="file-name">{file.name}</p>
              <p className="file-size">{file.size}</p>
            </div>

            <button
              className="print-btn"
              onClick={() => handlePrint(file.id)}
            >
              Print
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
