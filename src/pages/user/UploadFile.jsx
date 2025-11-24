import React from "react";

export default function UploadFile() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Upload New File</h2>
      <input type="file" />
      <button style={{ marginTop: 10 }}>Upload</button>
    </div>
  );
}
