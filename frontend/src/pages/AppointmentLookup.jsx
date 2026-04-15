import { useState } from "react";
import axios from "axios";
import "./AppointmentLookup.css";

function AppointmentLookup({ goBack, goHome }) {
  const [phone, setPhone] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [banner, setBanner] = useState({ message: "", type: "" });

  const search = async () => {
    try {
      setBanner({ message: "", type: "" });

      if (!phone) {
        setBanner({ message: "Please enter phone number", type: "error" });
        return;
      }

      const res = await axios.get(
        `http://localhost:8000/appointments/by-patient/${phone}`
      );

      if (!res.data || res.data.length === 0) {
        setAppointments([]);
        setBanner({ message: "No appointments found", type: "error" });
        return;
      }

      setAppointments(res.data);

    } catch {
      setAppointments([]);
      setBanner({ message: "Failed to fetch appointments", type: "error" });
    }
  };

  const formatDate = (dt) => {
    return new Date(dt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
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
          <h1 className="app-title">Appointment Lookup</h1>
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

          <h2>Search by Phone</h2>

          {/* SEARCH */}
          <div className="form-row">
            <input
              className="input-field"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button className="primary-btn" onClick={search}>
              Search
            </button>
          </div>

          {/* TABLE */}
          {appointments.length > 0 && (
            <div className="table-container">

              <table className="data-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.appointment_id}>
                      <td>{a.appointment_id}</td>
                      <td>{a.patient_name}</td>
                      <td>{a.doctor_name}</td>
                      <td>{a.department}</td>
                      <td>{formatDate(a.appointment_datetime)}</td>
                      <td className={`status ${a.status.toLowerCase()}`}>
                        {a.status}
                      </td>
                    </tr>
                  ))}
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

export default AppointmentLookup;