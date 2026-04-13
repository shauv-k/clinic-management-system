import { useState } from "react";
import axios from "axios";
import "./Prescription.css";

function Prescription({ go }) {
  const [mode, setMode] = useState(""); // "" (selection), "create", or "lookup"
  const [appointmentId, setAppointmentId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  const [form, setForm] = useState({
    appointment_id: "",
    medication_id: "",
    dosage: "",
    frequency: "",
    duration: ""
  });

  // 🔍 LOOKUP
  const getPrescription = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/prescriptions/${appointmentId}`
      );
      setPrescriptions(Array.isArray(res.data) ? res.data : [res.data]);
    } catch {
      alert("❌ No prescription found");
      setPrescriptions([]);
    }
  };

  // ➕ CREATE
  const createPrescription = async () => {
    try {
      if (!form.appointment_id || !form.medication_id) {
        alert("Please fill in required IDs");
        return;
      }
      await axios.post("http://localhost:8000/prescriptions", form);
      alert("✅ Prescription added");
      setForm({ appointment_id: "", medication_id: "", dosage: "", frequency: "", duration: "" });
      setMode(""); // Return to main prescription menu
    } catch (err) {
      alert("❌ Error creating prescription");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => (mode === "" ? go("dashboard") : setMode(""))}>
            <i className="fa-solid fa-arrow-left"></i> {mode === "" ? "Back to Dashboard" : "Back"}
          </button>
          <h1>Prescription Management</h1>
        </div>
        <p>Issue new medications or retrieve existing prescriptions</p>
      </header>

      <main className="management-grid">
        {/* 🔥 MAIN MODE SELECTION */}
        {mode === "" && (
          <div className="mode-selection-container">
            <div className="card selection-card" onClick={() => setMode("create")}>
              <div className="card-icon"><i className="fa-solid fa-file-prescription"></i></div>
              <h2>Create Prescription</h2>
              <p>Issue a new medication record for a completed appointment.</p>
              <button className="card-button">Open Form</button>
            </div>

            <div className="card selection-card" onClick={() => setMode("lookup")}>
              <div className="card-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
              <h2>Lookup Prescription</h2>
              <p>Search for prescriptions using a specific Appointment ID.</p>
              <button className="card-button outline">Search Records</button>
            </div>
          </div>
        )}

        {/* ================= CREATE SECTION ================= */}
        {mode === "create" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2><i className="fa-solid fa-plus-circle"></i> New Prescription</h2>
              <div className="registration-form">
                <div className="form-group">
                  <label>Appointment ID</label>
                  <input
                    type="text"
                    placeholder="Enter Appointment ID"
                    value={form.appointment_id}
                    onChange={(e) => setForm({ ...form, appointment_id: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Medication ID</label>
                  <input
                    type="text"
                    placeholder="Enter Medication ID"
                    value={form.medication_id}
                    onChange={(e) => setForm({ ...form, medication_id: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Dosage</label>
                    <input
                      type="text"
                      placeholder="e.g. 500mg"
                      value={form.dosage}
                      onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Frequency</label>
                    <input
                      type="text"
                      placeholder="e.g. 1-0-1"
                      value={form.frequency}
                      onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Days"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  />
                </div>
                <button className="card-button submit-btn" onClick={createPrescription}>
                  Submit Prescription
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= LOOKUP SECTION ================= */}
        {mode === "lookup" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2><i className="fa-solid fa-search"></i> Find Prescription</h2>
              <div className="search-box">
                <input
                  placeholder="Enter Appointment ID"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
                <button className="card-button" onClick={getPrescription}>Search</button>
              </div>

              <div className="prescription-results">
                {prescriptions.map((p, index) => (
                  <div key={index} className="prescription-card-item">
                    <div className="result-header">
                       <span className="appt-id-badge">Appt ID: #{p.appointment_id}</span>
                    </div>
                    <div className="detail-row"><span><strong>Medication ID:</strong></span><span>{p.medication_id}</span></div>
                    <div className="detail-row"><span><strong>Dosage:</strong></span><span>{p.dosage}</span></div>
                    <div className="detail-row"><span><strong>Frequency:</strong></span><span>{p.frequency}</span></div>
                    <div className="detail-row"><span><strong>Duration:</strong></span><span>{p.duration}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Prescription;