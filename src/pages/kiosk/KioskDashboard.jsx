import React, { useEffect, useState } from "react";
import "../../styles/kiosk.css";
import api from "../../api/api";
import KioskQR from "./KioskQR";
import sendToLocalPrinter from "../../utils/PrintHelper"; 

export default function KioskDashboard() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]); // uploaded files by user
  const [printQueue, setPrintQueue] = useState([]); // print jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const kioskId = localStorage.getItem("KIOSK_ID");
  const kioskToken = localStorage.getItem("KIOSK_TOKEN");

  // NEW — Printer connection state
  const [printerStatus, setPrinterStatus] = useState({
    printerConnected: false,
    printers: []
  });


  async function loadKioskStatus() {
    if (!kioskId) {
      setError("No kioskId found. Please login kiosk again.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/kiosk/status/${kioskId}`, {
        headers: kioskToken ? { Authorization: `Bearer ${kioskToken}` } : {},
      });

      // backend should return: { connectedUser, pendingFiles, userFiles }
      const data = res.data || {};
      if (data.connectedUser) {
        setConnected(true);
        setUser(data.connectedUser);
        setFiles(data.uploadedFiles || []); // support both shapes
        setPrintQueue(data.pendingFiles || []);
      } else {
        setConnected(false);
        setUser(null);
        setFiles([]);
        setPrintQueue([]);
      }
      setError(null);
    } catch (err) {
      console.error("loadKioskStatus:", err);
      setError("Unable to reach server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKioskStatus();
     checkPrinterStatus();
    const id = setInterval(loadKioskStatus, 2000);
    const p = setInterval(checkPrinterStatus, 3000);
    return () => clearInterval(id);
    return () => clearInterval(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
//---------------printer
    //   checkPrinterStatus();
    // const p = setInterval(checkPrinterStatus, 3000);
    // return () => clearInterval(p);

  }, []);

///-------------------for printer
    async function checkPrinterStatus() {
      try {
        const res = await fetch("http://localhost:9100/status");
        const data = await res.json();
        setPrinterStatus(data);
      } catch (err) {
        console.error("Printer status error:", err);
        setPrinterStatus({ printerConnected: false, printers: [] });
      }
    }


  // ACTIONS
  // async function handleStartPrint(fileId) {
  //   try {
  //     await api.post("/kiosk/print", { fileId });
  //     // refresh queue
  //     await loadKioskStatus();
  //     alert("Print job started");
  //   } catch (err) {
  //     console.error("Start print:", err);
  //     alert("Failed to start print");
  //   }
  // }


async function handleStartPrint(fileId) {
  try {
    // Step 1: Get file path from backend
    // const res = await api.get(`/kiosk/file/${fileId}`);
    const res =await api.get(`/file/${fileId}`);

    const filePath = res.data.localFilePath; // backend must return this

    if (!filePath) {
      alert("File not available on kiosk.");
      return;
    }

    // Step 2: Print on kiosk
    const printResult = await sendToLocalPrinter(filePath);

    if (printResult.error) {
      alert("Printer error — check if printer is connected");
      return;
    }

    // Step 3: Notify backend
    await api.post("/kiosk/print", { fileId });

    alert("Print sent to printer");
    await loadKioskStatus();
  } catch (err) {
    console.error("Start print:", err);
    alert("Failed to start print");
  }
}



  async function handleMarkComplete(fileId) {
    try {
      await api.post("/kiosk/print/complete", { fileId });
      await loadKioskStatus();
    } catch (err) {
      console.error("Complete print:", err);
      alert("Failed to mark complete");
    }
  }

  async function handleDisconnectUser() {
    if (!kioskId) return;
    if (!window.confirm("Disconnect current user from this kiosk?")) return;

    try {
      await api.post("/kiosk/disconnect", { kioskId });
      await loadKioskStatus();
    } catch (err) {
      console.error("Disconnect:", err);
      alert("Failed to disconnect");
    }
  }

  // NEW — Send file to local printer
async function sendToLocalPrinter(filePath) {
  try {
    const res = await fetch("http://localhost:9000/print", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Local Printer Error:", err);
    return { error: true };
  }
}

  // UI helpers
  function formatSize(bytes) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  // Loading / Not logged in
  if (!kioskId) {
    return (
      <div className="kiosk-container big-ui">
        <h2 className="title">📟 Smart Print Kiosk</h2>
        <div className="big-centered">
          <p className="error-text">Kiosk not logged in — please login.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="kiosk-container big-ui">
        <h2 className="title">📟 Smart Print Kiosk</h2>
        <div className="big-centered">
          <p>Loading status…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kiosk-container big-ui">
      <header className="big-header">
        <div className="big-left">
          <h2 className="title">📟 Smart Print Kiosk</h2>
          <p className="kid">Kiosk ID: <b>{kioskId}</b></p>
        </div>

        <div className="big-right">
          <div className={`status-pill ${connected ? "online" : "offline"}`}>
            {connected ? "USER CONNECTED" : "WAITING"}
          </div>
          <button className="big-logout" onClick={() => { localStorage.removeItem("KIOSK_ID"); localStorage.removeItem("KIOSK_TOKEN"); window.location.reload(); }}>
            Logout
          </button>
        </div>
      </header>

      <main className="big-grid">

        {/* LEFT: Tiles */}
        <section className="tiles-col">
          {/* Uploaded Files Tile */}
          <div className="tile">
            <h3 className="tile-title">📁 Uploaded Files</h3>
            <div className="tile-body">
              {connected ? (
                files.length === 0 ? (
                  <p className="empty-text">No files uploaded by user.</p>
                ) : (
                  <div className="tile-list">
                    {files.map((f) => (
                      <div className="tile-row" key={f._id || f.id}>
                        <div className="tile-file">
                          <p className="tile-file-name">{f.fileName}</p>
                          <p className="tile-file-meta">{formatSize(f.fileSize)}</p>
                        </div>
                        <button className="tile-action" onClick={() => handleStartPrint(f._id)}>Print</button>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="tile-empty">
                  <p>Waiting for a user to connect.</p>
                </div>
              )}
            </div>
          </div>

          {/* Print Queue Tile */}
          <div className="tile">
            <h3 className="tile-title">🖨 Print Queue</h3>
            <div className="tile-body">
              {connected ? (
                printQueue.length === 0 ? (
                  <p className="empty-text">No pending print jobs.</p>
                ) : (
                  <div className="tile-list">
                    {printQueue.map((job) => (
                      <div className="tile-row" key={job._id}>
                        <div className="tile-file">
                          <div className="tile-file-name">{job.fileName}</div>
                          <div className="tile-file-meta">Status: <b>{job.status}</b></div>
                        </div>
                        <div className="tile-actions-vertical">
                          <button className="tile-action small" onClick={() => handleStartPrint(job._id)}>Start</button>
                          <button className="tile-action small secondary" onClick={() => handleMarkComplete(job._id)}>Done</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="tile-empty">
                  <p>Queue is empty until a user connects.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* RIGHT: Big control tiles */}
        <aside className="controls-col">

              { /* printer */}
              <div className="big-tile">
                <div className="big-tile-title">🖨 Printer Status</div>
                <div className="big-tile-sub">
                  {printerStatus.printerConnected ? (
                    <>
                      <b style={{color:"green"}}>Connected</b>
                      <br />
                      Printer: {printerStatus.printers[0]?.name || "Unknown"}
                    </>
                  ) : (
                    <b style={{color:"red"}}>Not Connected</b>
                  )}
                </div>
                <div className="big-tile-cta">
                  Refresh
                </div>
                <div className="big-tile-cta"onClick={() => sendToLocalPrinter("C:/test-files/test.pdf")} >
                    Test Print
                  </div>

              </div>






          <div className="big-tile" onClick={() => { /* optional: open details */ }}>
            <div className="big-tile-title">🔗 Connect</div>
            <div className="big-tile-sub">Show QR & Connect flow</div>
            {!connected && <div className="big-tile-cta">Open QR</div>}
            {connected && <div className="big-tile-cta small-cta">Connected</div>}
          </div>

          <div className="big-tile" onClick={() => alert("Support / Help pressed")}>
            <div className="big-tile-title">❓ Help</div>
            <div className="big-tile-sub">Show troubleshooting steps</div>
            <div className="big-tile-cta">Open</div>
          </div>

          <div className="big-tile danger" onClick={handleDisconnectUser}>
            <div className="big-tile-title">⛔ Disconnect User</div>
            <div className="big-tile-sub">Force disconnect current user</div>
            <div className="big-tile-cta">Disconnect</div>
          </div>

          <div className="big-tile" onClick={() => alert("Open settings")}>
            <div className="big-tile-title">⚙️ Settings</div>
            <div className="big-tile-sub">Kiosk settings</div>
            <div className="big-tile-cta">Open</div>
          </div>
        </aside>
      </main>

      {/* Footer small note */}
      <footer className="big-footer">
        <small>Last checked: {new Date().toLocaleTimeString()}</small>
      </footer>
    </div>
  );
}
