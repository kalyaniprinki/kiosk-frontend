import React, { useState } from "react";

export default function AdminUsers() {
  const [users] = useState([
    { id: 1, name: "Kalyani", email: "kalyani@example.com" },
    { id: 2, name: "Aarav", email: "aarav@example.com" },
    { id: 3, name: "Riya", email: "riya@example.com" },
  ]);

  function deleteUser(id) {
    alert("Delete user with ID: " + id);
  }

  return (
    <div className="list-container">
      <h3>Registered Users</h3>

      {users.map((u) => (
        <div className="list-row" key={u.id}>
          <div>
            <p className="name">{u.name}</p>
            <p className="email">{u.email}</p>
          </div>

          <button className="delete-btn" onClick={() => deleteUser(u.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
