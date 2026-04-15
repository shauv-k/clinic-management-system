import { useState } from "react";
import axios from "axios";
import "./AppointmentUpdate.css";

function AppointmentUpdate({ goBack, goHome }) {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [banner, setBanner] = useState({ message: "", type: "" });

  const [appointment, setAppointment] = useState(null);

  const formatDate = (dt) => {
    return new Date(dt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // UPDATE
  const update = async () => {
    try {
      setBanner({ message: "", type: "" });

      if (!id || !status) {
        setBanner({ message: "Please fill all fields", type: "error" });
        return;
      }

      await axios.patch(
        `http://localhost:8000/appointments/${id}/status`,
        { status }
      );

      setBanner({
        message: "Status updated successfully",
        type: "success",
      });

      // FETCH UPDATED RECORD
      const res = await axios.get("http://localhost:8000/appointments/");
      const found = res.data.find(
        (a) => a.appointment_id === Number(id)
      );

      setAppointment(found || null);

    } catch (err) {
      setBanner({
        message: err.response?.data?.detail || "Update failed",
        type: "error",
      });
    }
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="app-header">

        <div className="header-left">
          <button className="back-btn" onClick={goBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="header-center">
          <h1 className="app-title">Update Appointment</h1>
        </div>

        <div className="header-right">
          <button className="back-btn" onClick={() => goHome("dashboard")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </button>
        </div>

      </header>

      <main className="management-grid single-column">

        <div className="card">

          <h2>Update Status</h2>

          {/* FORM */}
          <div className="form-group">
            <label>Appointment ID</label>
            <input
              className="input-field"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter appointment ID"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              className="input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="NO_SHOW">NO SHOW</option>
            </select>
          </div>

          <button
            className="primary-btn full-width"
            onClick={update}
          >
            Update Status
          </button>

          {/* DETAILS */}
          {appointment && (
            <div className="result-card">

              <h3>Appointment Details</h3>

              <table className="data-table">
                <tbody>
                  <tr><td>ID</td><td>{appointment.appointment_id}</td></tr>
                  <tr><td>Patient</td><td>{appointment.patient_name}</td></tr>
                  <tr><td>Doctor</td><td>{appointment.doctor_name}</td></tr>
                  <tr><td>Department</td><td>{appointment.department}</td></tr>
                  <tr><td>Date</td><td>{formatDate(appointment.appointment_datetime)}</td></tr>
                  <tr><td>Status</td><td>{appointment.status}</td></tr>
                </tbody>
              </table>

            </div>
          )}

        </div>

      </main>

      {/* BANNER */}
      {banner.message && (
        <div className={`banner ${banner.type}`}>
          <span>{banner.message}</span>
          <button onClick={() => setBanner({ message: "", type: "" })}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default AppointmentUpdate;