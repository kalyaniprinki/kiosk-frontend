import React, { useState } from "react";
import "../../styles/userupload.css";
import api from "../../api/api";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function handleFileSelect(e) {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const selected = e.dataTransfer.files[0];
    if (selected) setFile(selected);
  }

  async function uploadFile() {
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await api.post("/user/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },

        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / p.total);
          setProgress(percent);
        }
      });

      alert("File uploaded successfully!");

      setFile(null);
      setProgress(0);
      setUploading(false);

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
      setUploading(false);
    }
  }

  return (
    <div className="upload-page">

      <h2 className="page-title">Upload New File</h2>
      <p className="page-subtitle">Accepted: PDF, Images, Docs</p>

      <div
        className={`drop-box ${dragActive ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1093/1093874.png"
              alt="upload"
              className="drop-icon"
            />
            <p>Drag & Drop your file here</p>
            <span>or</span>
            <label className="browse-btn">
              Browse File
              <input type="file" onChange={handleFileSelect} hidden />
            </label>
          </>
        ) : (
          <div className="file-preview">
            <p><strong>Selected:</strong> {file.name}</p>
            <button className="remove-file" onClick={() => setFile(null)}>
              Remove
            </button>
          </div>
        )}
      </div>

      <button
        className="upload-btn"
        onClick={uploadFile}
        disabled={uploading || !file}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {uploading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
