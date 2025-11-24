import React, { useState } from "react";
import "../../styles/userdashboard.css";

export default function UserDashboard() {
  const [wallet, setWallet] = useState(120);
  const [connected, setConnected] = useState(false);
  const [kioskId, setKioskId] = useState(null);

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");

  const [files, setFiles] = useState([
    { id: 1, name: "Document1.pdf", size: "240 KB" },
    { id: 2, name: "Notes.docx", size: "120 KB" },
  ]);

  function handleConnect() {
    setConnected(true);
    setKioskId("KIOSK-44A2");
  }

  function handlePrint(fileId) {
    alert("Printing file ID: " + fileId);
  }

  function addBalance() {
    if (!addAmount || isNaN(addAmount)) {
      alert("Enter valid amount");
      return;
    }
    setWallet(wallet + Number(addAmount));
    setAddAmount("");
    setShowWalletModal(false);
  }

  return (
    <div className="dash-container">

      {/* HEADER */}
      <div className="dash-header">
        <h2 className="header-title">Welcome, User 👋</h2>

        <div className="status-card">
          <span className={`status-dot ${connected ? "online" : "offline"}`}></span>
          {connected ? (
            <p>Connected to <b>{kioskId}</b></p>
          ) : (
            <p>Not Connected</p>
          )}
        </div>
      </div>

      {/* WALLET + CONNECT */}
      <div className="top-section">

        <div className="wallet-box">
          <div className="wallet-left">
            <p className="wallet-label">Wallet Balance</p>
            <h2 className="wallet-amount">₹ {wallet}</h2>
          </div>

          <button className="wallet-add-btn" onClick={() => setShowWalletModal(true)}>
            + Add
          </button>
        </div>

        <button
          className={`connect-btn ${connected ? "connected" : ""}`}
          onClick={handleConnect}
        >
          {connected ? "🟢 Connected" : "🔗 Connect To Kiosk"}
        </button>
      </div>

      {/* ACTION GRID */}
      <div className="action-grid">

        <a className="action-card" href="/user/upload">
          <div className="icon-circle">⬆️</div>
          <p>Upload File</p>
        </a>

        <a className="action-card" href="/user/files">
          <div className="icon-circle">📁</div>
          <p>My Files</p>
        </a>

        <a className="action-card" href="/user/kiosk">
          <div className="icon-circle">📡</div>
          <p>Kiosk Link</p>
        </a>
      </div>

      {/* FILE LIST */}
      <h3 className="section-title">📄 Recently Uploaded</h3>

      <div className="file-list">
        {files.map((file) => (
          <div className="file-item" key={file.id}>
            <div className="file-info">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{file.size}</p>
            </div>

            <button className="print-btn" onClick={() => handlePrint(file.id)}>
              🖨 Print
            </button>
          </div>
        ))}
      </div>

      {/* WALLET MODAL */}
      {showWalletModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add Money to Wallet</h3>

            <input
              type="number"
              placeholder="Enter amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className="modal-input"
            />

            <button className="modal-btn" onClick={addBalance}>
              Add Balance
            </button>

            <button className="modal-close" onClick={() => setShowWalletModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
