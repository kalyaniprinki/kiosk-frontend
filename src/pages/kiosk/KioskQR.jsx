import React from "react";

export default function KioskQR({ onSimulateConnect }) {
  return (
    <div className="qr-box">
      <h3>Scan to Connect</h3>
      <p className="qr-sub">Ask the user to scan this QR to connect</p>

      <div className="qr-image">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=connect-to-kiosk"
          alt="QR Code"
        />
      </div>

      {/* TEMPORARY for testing */}
      <button className="simulate-btn" onClick={onSimulateConnect}>
        Simulate User Connecting
      </button>
    </div>
  );
}
