import { useState } from "react";
import axios from "axios";
import "./MedicalRecord.css";

function MedicalRecord({ go }) {
  const [mode, setMode] = useState(""); // "" (selection), "create", or "lookup"
  const [appointmentId, setAppointmentId] = useState("");
  const [record, setRecord] = useState(null);

  const [form, setForm] = useState({
    appointment_id: "",
    symptoms: "",
    diagnosis: "",
    treatment: ""
  });

  // ================= CREATE =================
  const createRecord = async () => {
    try {
      if (!form.appointment_id || !form.symptoms || !form.diagnosis || !form.treatment) {
        alert("⚠️ All fields are required");
        return;
      }

      const payload = {
        appointment_id: Number(form.appointment_id),
        symptoms: form.symptoms,
        diagnosis: form.diagnosis,
        treatment: form.treatment
      };

      await axios.post("http://localhost:8000/medical-record", payload);
      alert("✅ Medical record created");
      setForm({ appointment_id: "", symptoms: "", diagnosis: "", treatment: "" });
      setMode(""); // Return to selection
    } catch (err) {
      alert(err.response?.data?.detail || "❌ Error creating record");
    }
  };

  // ================= LOOKUP =================
  const getRecord = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/medical-record/${appointmentId}`);
      setRecord(res.data);
    } catch (err) {
      alert("❌ Record not found");
      setRecord(null);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => (mode === "" ? go("dashboard") : setMode(""))}>
            <i className="fa-solid fa-arrow-left"></i> {mode === "" ? "Back to Dashboard" : "Back"}
          </button>
          <h1>Medical Records</h1>
        </div>
        <p>Document patient visits and maintain clinical history</p>
      </header>

      <main className="management-grid">
        {/* 🔥 MODE SELECTION */}
        {mode === "" && (
          <div className="mode-selection-container">
            <div className="card selection-card" onClick={() => setMode("create")}>
              <div className="card-icon"><i className="fa-solid fa-notes-medical"></i></div>
              <h2>Create Record</h2>
              <p>Add symptoms, diagnosis, and treatments for an appointment.</p>
              <button className="card-button">New Entry</button>
            </div>

            <div className="card selection-card" onClick={() => setMode("lookup")}>
              <div className="card-icon"><i className="fa-solid fa-folder-open"></i></div>
              <h2>Lookup Record</h2>
              <p>Retrieve full clinical details using an Appointment ID.</p>
              <button className="card-button outline">Search History</button>
            </div>
          </div>
        )}

        {/* ================= CREATE SECTION ================= */}
        {mode === "create" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2><i className="fa-solid fa-plus-circle"></i> New Clinical Entry</h2>
              <div className="registration-form">
                <div className="form-group">
                  <label>Appointment ID</label>
                  <input
                    type="number"
                    placeholder="Enter ID"
                    value={form.appointment_id}
                    onChange={(e) => setForm({ ...form, appointment_id: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Symptoms</label>
                  <textarea
                    placeholder="Patient complaints..."
                    value={form.symptoms}
                    onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Diagnosis</label>
                  <input
                    type="text"
                    placeholder="Final diagnosis"
                    value={form.diagnosis}
                    onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Treatment Plan</label>
                  <textarea
                    placeholder="Prescribed treatments/actions"
                    value={form.treatment}
                    onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                  />
                </div>
                <button className="card-button submit-btn" onClick={createRecord}>
                  Save Medical Record
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= LOOKUP SECTION ================= */}
        {mode === "lookup" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2><i className="fa-solid fa-search"></i> Find Record</h2>
              <div className="search-box">
                <input
                  placeholder="Enter Appointment ID"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
                <button className="card-button" onClick={getRecord}>Search</button>
              </div>

              {record && (
                <div className="record-result-card">
                  <div className="result-header">
                    <span className="record-id-tag">Record #{record.record_id}</span>
                    <span className="appt-id-mini">Appt ID: {record.appointment_id}</span>
                  </div>

                  <div className="clinical-data">
                    <div className="data-block">
                      <strong>Symptoms:</strong>
                      <p>{record.symptoms}</p>
                    </div>
                    <div className="data-block">
                      <strong>Diagnosis:</strong>
                      <p className="diagnosis-text">{record.diagnosis}</p>
                    </div>
                    <div className="data-block">
                      <strong>Treatment:</strong>
                      <p>{record.treatment}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default MedicalRecord;