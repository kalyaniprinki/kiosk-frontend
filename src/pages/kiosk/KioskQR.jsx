import React from "react";
import "../../styles/kiosk.css";

export default function KioskQR({ onSimulateConnect }) {
  const kioskId = localStorage.getItem("kioskId") || "UNKNOWN";

  return (
    <div className="qr-section">

      <h3 className="qr-title">Scan to Connect</h3>

      <div className="qr-box">
        {/* You can later replace this with real QR Code */}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${kioskId}`}
          alt="Kiosk QR"
          className="qr-image"
        />
      </div>

      <p className="qr-info">
        Ask the user to scan this QR code to connect their mobile app to the kiosk.
      </p>

      {/* OPTIONAL — For development only */}
      {onSimulateConnect && (
        <button className="simulate-btn" onClick={onSimulateConnect}>
          Simulate User Connect
        </button>
      )}
    </div>
  );
}
