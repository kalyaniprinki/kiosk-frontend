import React, { useState } from "react";
// import "./UserUpload.css";

export default function Upload() {
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

  function uploadFile() {
    if (!file) return alert("Select a file first!");

    setUploading(true);
    setProgress(0);

    // Fake upload progress
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            alert("Upload complete!");
            setUploading(false);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }

  return (
    <div className="upload-page">

      <h2 className="page-title">Upload New File</h2>
      <p className="page-subtitle">Accepted: PDF, Images, Docs</p>

      {/* Drag and Drop area */}
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

      {/* Upload button */}
      <button
        className="upload-btn"
        onClick={uploadFile}
        disabled={uploading || !file}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Progress Bar */}
      {uploading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
