import React from "react";

export default function KioskConnected({ user, files }) {
  function printFile(fileId) {
    alert("Printing file ID: " + fileId);
  }

  return (
    <div className="connected-box">
      <h3>Connected User</h3>

      <div className="user-card">
        <p className="name">{user.name}</p>
        <p className="email">{user.email}</p>
      </div>

      <h3 className="section-title">User Files</h3>

      <div className="file-list">
        {files.map((file) => (
          <div className="file-row" key={file.id}>
            <div>
              <p className="file-name">{file.name}</p>
              <p className="file-size">{file.size}</p>
            </div>

            <button
              className="print-btn"
              onClick={() => printFile(file.id)}
            >
              Print
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
