import { useState } from "react";
import axios from "axios";
import "./MedicalRecord.css";

function MedicalRecord({ go }) {
  const [mode, setMode] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [record, setRecord] = useState(null);

  const [banner, setBanner] = useState({ message: "", type: "" });

  const [form, setForm] = useState({
    appointment_id: "",
    symptoms: "",
    diagnosis: "",
    treatment: ""
  });

  const createRecord = async () => {
    try {
      if (!form.appointment_id || !form.symptoms || !form.diagnosis || !form.treatment) {
        setBanner({ message: "All fields are required", type: "error" });
        return;
      }

      await axios.post("http://localhost:8000/medical-record", {
        appointment_id: Number(form.appointment_id),
        symptoms: form.symptoms,
        diagnosis: form.diagnosis,
        treatment: form.treatment
      });

      setBanner({ message: "Medical record created", type: "success" });

      setForm({
        appointment_id: "",
        symptoms: "",
        diagnosis: "",
        treatment: ""
      });

      setMode("");

    } catch (err) {
      setBanner({
        message: err.response?.data?.detail || "Error creating record",
        type: "error"
      });
    }
  };

  const getRecord = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/medical-record/${appointmentId}`
      );

      setRecord(res.data);

    } catch {
      setRecord(null);
      setBanner({ message: "Record not found", type: "error" });
    }
  };

  // ================= CREATE =================
  if (mode === "create") {
    return (
      <div className="dashboard-container">

        <header className="app-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => setMode("")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>

          <div className="header-center">
            <h1 className="app-title">Create Medical Record</h1>
          </div>

          <div className="header-right">
            <button className="back-btn" onClick={() => go("dashboard")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 22V12h6v10" />
              </svg>
            </button>
          </div>
        </header>

        <main className="management-grid single-column">
          <div className="card">

            <h2>New Clinical Entry</h2>

            <div className="form-group">
              <label>Appointment ID</label>
              <input
                className="input-field"
                value={form.appointment_id}
                onChange={(e) => setForm({ ...form, appointment_id: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Symptoms</label>
              <textarea
                className="input-field"
                value={form.symptoms}
                onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Diagnosis</label>
              <input
                className="input-field"
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Treatment</label>
              <textarea
                className="input-field"
                value={form.treatment}
                onChange={(e) => setForm({ ...form, treatment: e.target.value })}
              />
            </div>

            <button className="primary-btn full-width" onClick={createRecord}>
              Save Record
            </button>

          </div>
        </main>

        {banner.message && (
          <div className={`banner ${banner.type}`}>
            <span>{banner.message}</span>
            <button onClick={() => setBanner({ message: "", type: "" })}>✕</button>
          </div>
        )}
      </div>
    );
  }

  // ================= LOOKUP =================
  if (mode === "lookup") {
    return (
      <div className="dashboard-container">

        <header className="app-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => setMode("")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>

          <div className="header-center">
            <h1 className="app-title">Lookup Medical Record</h1>
          </div>

          <div className="header-right">
            <button className="back-btn" onClick={() => go("dashboard")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 22V12h6v10" />
              </svg>
            </button>
          </div>
        </header>

        <main className="management-grid single-column">
          <div className="card">

            <h2>Find Record</h2>

            <div className="form-row">
              <input
                className="input-field"
                placeholder="Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
              />

              <button className="primary-btn" onClick={getRecord}>
                Search
              </button>
            </div>

            {record && (
              <div className="result-card">

                <h3>Record #{record.record_id}</h3>

                <p><b>Appointment:</b> {record.appointment_id}</p>

                <div className="data-block">
                  <b>Symptoms</b>
                  <p>{record.symptoms}</p>
                </div>

                <div className="data-block">
                  <b>Diagnosis</b>
                  <p>{record.diagnosis}</p>
                </div>

                <div className="data-block">
                  <b>Treatment</b>
                  <p>{record.treatment}</p>
                </div>

              </div>
            )}

          </div>
        </main>

        {banner.message && (
          <div className={`banner ${banner.type}`}>
            <span>{banner.message}</span>
            <button onClick={() => setBanner({ message: "", type: "" })}>✕</button>
          </div>
        )}
      </div>
    );
  }

  // ================= MENU =================
  return (
    <div className="dashboard-container">

      <header className="app-header">

        <div className="header-left">
          <button className="back-btn" onClick={() => go("dashboard")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="header-center">
          <h1 className="app-title">Medical Records</h1>
        </div>

        <div className="header-right"></div>

      </header>

      <main className="dashboard-grid">

        <div className="dashboard-card">
          <div className="card-content">

            <div className="card-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>

            <h2 className="card-title">Create Record</h2>
            <p className="card-description">Add clinical details</p>

          </div>

          <button className="primary-btn" onClick={() => setMode("create")}>
            Open
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-content">

            <div className="card-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2h6v4H9z" />
                <path d="M4 6h16v16H4z" />
                <path d="M8 12h8M8 16h5" />
              </svg>
            </div>

            <h2 className="card-title">Lookup Record</h2>
            <p className="card-description">View clinical history</p>

          </div>

          <button className="primary-btn" onClick={() => setMode("lookup")}>
            Open
          </button>
        </div>

      </main>

      {banner.message && (
        <div className={`banner ${banner.type}`}>
          <span>{banner.message}</span>
          <button onClick={() => setBanner({ message: "", type: "" })}>✕</button>
        </div>
      )}

    </div>
  );
}

export default MedicalRecord;