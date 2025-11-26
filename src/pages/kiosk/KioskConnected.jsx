import React from "react";
import "../../styles/kiosk.css";
import api from "../../api/api";

export default function KioskConnected({ user, files }) {

  // Kiosk prints a file
  const handlePrint = async (fileId) => {
    try {
      const res = await api.post(`/kiosk/print`, { fileId });

      alert(res.data.message || "Print started");
    } catch (err) {
      console.error("Print error:", err);
      alert("Failed to print");
    }
  };

  // Mark print job completed
  const markCompleted = async (fileId) => {
    try {
      const res = await api.post(`/kiosk/print/complete`, { fileId });

      alert("Marked as completed");
    } catch (err) {
      console.error("Completion error:", err);
      alert("Failed to update print status");
    }
  };

  return (
    <div className="connected-box">

      {/* USER DETAILS */}
      <div className="user-info">
        <h3>Connected User</h3>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>

      {/* FILES SECTION */}
      <h3 className="section-title">Pending Print Jobs</h3>

      {files.length === 0 ? (
        <p className="no-files">No files to print</p>
      ) : (
        <div className="file-list">
          {files.map((file) => (
            <div className="file-item" key={file.id}>
              
              <div className="file-info">
                <p className="file-name">{file.name}</p>
                <p className="file-size">{file.size}</p>
              </div>

              <div className="file-actions">
                <button className="print-btn" onClick={() => handlePrint(file.id)}>
                  🖨 Print
                </button>

                <button className="complete-btn" onClick={() => markCompleted(file.id)}>
                  ✔ Mark Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
