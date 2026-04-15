import { useState } from "react";
import AppointmentCreate from "./AppointmentCreate";
import AppointmentLookup from "./AppointmentLookup";
import AppointmentUpdate from "./AppointmentUpdate";
import "./Appointment.css";

function Appointment({ go }) {
  const [mode, setMode] = useState("");

  // ROUTING
  if (mode === "create") {
    return (
      <AppointmentCreate
        goBack={() => setMode("")}
        goHome={go}
      />
    );
  }

  if (mode === "lookup") {
    return (
      <AppointmentLookup
        goBack={() => setMode("")}
        goHome={go}
      />
    );
  }

  if (mode === "update") {
    return (
      <AppointmentUpdate
        goBack={() => setMode("")}
        goHome={go}
      />
    );
  }

  // 🔥 SVG ICONS (CONSISTENT SYSTEM)
  const icons = {
    create: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    lookup: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
    update: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="app-header">

        <div className="header-left">
          <button className="back-btn" onClick={() => go("dashboard")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="header-center">
          <h1 className="app-title">Appointment Management</h1>
        </div>

        <div className="header-right"></div>

      </header>

      {/* MENU */}
      <main className="dashboard-grid">

        <div className="dashboard-card">
          <div className="card-content">
            <div className="card-icon">{icons.create}</div>
            <h2 className="card-title">Create</h2>
            <p className="card-description">
              Schedule a new appointment
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setMode("create")}
          >
            Open
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <div className="card-icon">{icons.lookup}</div>
            <h2 className="card-title">Lookup</h2>
            <p className="card-description">
              View existing appointments
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setMode("lookup")}
          >
            Open
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <div className="card-icon">{icons.update}</div>
            <h2 className="card-title">Update Status</h2>
            <p className="card-description">
              Modify appointment status
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setMode("update")}
          >
            Open
          </button>
        </div>

      </main>
    </div>
  );
}

export default Appointment;