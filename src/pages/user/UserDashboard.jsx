import React, { useState, useEffect } from "react";
import "../../styles/userdashboard.css";
import api from "../../api/api"; // Axios instance pointing to your backend
import sendToLocalPrinter from "../../utils/PrintHelper"; 


export default function UserDashboard() {
  const [wallet, setWallet] = useState(0);
  const [connected, setConnected] = useState(false);
  const [kioskId, setKioskId] = useState(null);

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputKioskId, setInputKioskId] = useState("");


  // Fetch user data on mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await api.get("/user/dashboard");
        const { walletBalance, connectedKiosk, uploadedFiles } = res.data;

        setWallet(walletBalance || 0);
        setConnected(!!connectedKiosk);
        setKioskId(connectedKiosk?.kioskId || null);
        setFiles(uploadedFiles || []);
        
      } catch (err) {
        console.error("Error fetching user dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

// async function loadFiles() {
//     try {
//       const res = await api.get("/user/files");
//       setFiles(res.data || []);
//     } catch (err) {
//       console.error("FILE ERROR:", err);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     loadFiles();
//   }, []);

  const handleConnect = async () => {
  if (!inputKioskId.trim()) {
    alert("Enter a Kiosk ID");
    return;
  }

  try {
    const res = await api.post("/user/kiosk/connect", {
      kioskId: inputKioskId, // "KIOSK7100", // inputKioskId,
    });

    setConnected(true);
    setKioskId(res.data.kioskId);

  } catch (err) {
    console.error("Error connecting to kiosk:", err);
    alert("Failed to connect to kiosk");
  }
};

// disconnect

async function handleDisconnect() {
  try {
    const res = await api.post("/user/kiosk/disconnect", {
      kioskId: kioskId,   // <-- send the kiosk id
    });

    console.log("Disconnected:", res.data);
    setConnected(false);
    setKioskId(null);

  } catch (error) {
    console.error("Error disconnecting:", error);
  }
};


   // AUTO-DISCONNECT ON PAGE LEAVE / RELOAD
  // useEffect(() => {
  //   const disconnectOnUnload = () => {
  //     if (connected && kioskId) {
  //       navigator.sendBeacon(
  //         "http://localhost:5000/api/user/kiosk/disconnect",
  //         JSON.stringify({ kioskId })
  //       );
  //     }
  //   };

  //   window.addEventListener("beforeunload", disconnectOnUnload);
  //   return () => window.removeEventListener("beforeunload", disconnectOnUnload);
  // }, [connected, kioskId]);


 // printfile
// Import your kiosk printing util
// import sendToLocalPrinter from "../../utils/printHelper"; 
// (same one you're using in KioskDashboard)

// PRINT FLOW (same as kiosk)
const handlePrint = async (fileId) => {
  try {
    if (!fileId) return alert("File ID missing!");

    // STEP 1 — get file from backend
    const res = await api.get(`/file/${fileId}`);
    // const filePath = res.data.localFilePath;

    // if (!filePath) {
    //   alert("File not found on server");
    //   return;
    // }

    // // STEP 2 — print locally
    // const printResult = await sendToLocalPrinter(filePath);
        const pdfUrl = res.data.pdfUrl; // backend must return public URL of the file

              if (!pdfUrl) {
                alert("File URL not available.");
                return;
              }

              // Step 2: Send URL to kiosk-agent
              const printResult = await sendToLocalPrinter(pdfUrl);

    // if (printResult.error) {
    //   alert("Printer error — check printer connection");
    //   return;
    // }

    // STEP 3 — notify backend
    await api.post("/kiosk/print", { fileId });

    alert("Print started!");
  } catch (err) {
    console.error("User Print Error:", err);
    alert("Failed to print file");
  }
};


  // Add wallet balance
  const addBalance = async () => {
    if (!addAmount || isNaN(addAmount)) {
      alert("Enter a valid amount");
      return;
    }
    try {
      const res = await api.post("/user/wallet/add", { amount: Number(addAmount) });
      setWallet(res.data.walletBalance);
      setAddAmount("");
      setShowWalletModal(false);
    } catch (err) {
      console.error("Error adding wallet balance:", err);
      alert("Failed to add balance");
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

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
        {/* <input
          type="text"
          className="kiosk-input"
          placeholder="Enter Kiosk ID"
          value={inputKioskId}
          onChange={(e) => setInputKioskId(e.target.value)}
        /> */}

        {/* <button
          className={`connect-btn ${connected ? "connected" : ""}`}
          onClick={handleConnect}
        >
          {connected ? "🟢 Connected" : "🔗 Connect To Kiosk"}
        </button> */}

        <div>
      {/* kiosk input */}
      <input
          type="text"
          className="kiosk-input"
          placeholder="Enter Kiosk ID"
          value={inputKioskId}
          onChange={(e) => setInputKioskId(e.target.value)}
        />

      {!connected ? (
        <button onClick={handleConnect}>Connect</button>
      ) : (
        <button onClick={handleDisconnect}>Disconnect</button>
      )}
    </div>


      </div>

      {/* ACTION GRID */}
      <div className="action-grid">
        <a className="action-card" href="/user/uploadfile">
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
          <div className="file-item" key={file._id|| file.id}>
            <div className="file-info">
              <p className="file-name">{file.fileName}</p>
              {/* <p className="file-size">{file.fileSize}</p> */}
            </div>
            <button className="print-btn" onClick={() => handlePrint(file._id)}>
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
            <button className="modal-btn" onClick={addBalance}>Add Balance</button>
            <button className="modal-close" onClick={() => setShowWalletModal(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}
