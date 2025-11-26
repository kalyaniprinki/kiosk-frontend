import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function UserFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadFiles() {
    try {
      const res = await api.get("/user/files");
      setFiles(res.data || []);
    } catch (err) {
      console.error("FILE ERROR:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function handlePrint(fileId) {
    try {
      const res = await api.post("/user/print", { fileId });
      alert(res.data.message);
    } catch (e) {
      alert("Printing failed");
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading files...</p>;

  return (
    <div className="files-page">
      <h2 className="page-title">Your Uploaded Files</h2>

      {files.length === 0 && (
        <p className="no-files">You have not uploaded any files yet.</p>
      )}

      <div className="file-list">
        {files.map((file) => (
          <div className="file-card" key={file._id}>
            <div className="file-info">
              <p className="file-name">{file.fileName}</p>

              <p className="file-meta">
                {file.fileSize
                  ? (file.fileSize / 1024).toFixed(1) + " KB"
                  : "Unknown size"}
              </p>

              <p className="file-date">
                Uploaded: {new Date(file.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              className="print-btn"
              onClick={() => handlePrint(file._id)}
            >
              Print
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
