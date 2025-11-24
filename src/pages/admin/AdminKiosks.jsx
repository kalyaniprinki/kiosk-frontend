import React, { useState } from "react";

export default function AdminKiosks() {
  const [kiosks] = useState([
    { id: "K-101", status: "online", location: "Library" },
    { id: "K-102", status: "offline", location: "Canteen" },
    { id: "K-103", status: "online", location: "Hostel Gate" },
  ]);

  return (
    <div className="list-container">
      <h3>Kiosks</h3>

      {kiosks.map((k) => (
        <div className="list-row" key={k.id}>
          <div>
            <p className="name">Kiosk {k.id}</p>
            <p className="email">Location: {k.location}</p>
          </div>

          <span className={k.status === "online" ? "status online" : "status offline"}>
            {k.status}
          </span>
        </div>
      ))}
    </div>
  );
}
