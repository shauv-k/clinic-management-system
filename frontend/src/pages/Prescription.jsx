import { useState } from "react";
import axios from "axios";
import "./Prescription.css";

function Prescription({ go }) {
  const [mode, setMode] = useState("");

  const [appointmentId, setAppointmentId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  const [form, setForm] = useState({
    appointment_id: "",
    medication_id: "",
    dosage: "",
    frequency: "",
    duration: ""
  });

  const [created, setCreated] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [medications, setMedications] = useState([]);

  const searchMedicine = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/medications/search",
        { params: { name: searchName } }
      );
      setMedications(res.data);
    } catch {
      setMedications([]);
    }
  };

  const getAllMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:8000/medications");
      setMedications(res.data);
    } catch {
      setMedications([]);
    }
  };

  const createPrescription = async () => {
    try {
      if (!form.appointment_id || !form.medication_id) {
        alert("Fill required fields");
        return;
      }

      await axios.post("http://localhost:8000/prescriptions", {
        appointment_id: Number(form.appointment_id),
        medication_id: Number(form.medication_id),
        dosage: form.dosage,
        frequency: form.frequency,
        duration: form.duration
      });

      setCreated(form);

      setForm({
        appointment_id: "",
        medication_id: "",
        dosage: "",
        frequency: "",
        duration: ""
      });

    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const getPrescription = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/prescriptions/${appointmentId}`
      );
      setPrescriptions(res.data);
    } catch {
      setPrescriptions([]);
    }
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="app-header">
        <button
          className="back-btn"
          onClick={() => (mode === "" ? go("dashboard") : setMode(""))}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <h1 className="app-title">Prescription Management</h1>

        <div style={{ width: "40px" }}></div>
      </header>

      <main className="management-grid">

        {/* ================= MENU ================= */}
        {mode === "" && (
          <div className="dashboard-grid">

            <div className="dashboard-card">
              <div className="card-content">
                <div className="card-icon">+</div>
                <h2 className="card-title">Create Prescription</h2>
                <p className="card-description">Add medicines for appointment</p>
              </div>
              <button className="primary-btn" onClick={() => setMode("create")}>
                Start
              </button>
            </div>

            <div className="dashboard-card">
              <div className="card-content">
                <div className="card-icon">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
</div>
                <h2 className="card-title">Lookup</h2>
                <p className="card-description">View prescriptions</p>
              </div>
              <button className="primary-btn" onClick={() => setMode("lookup")}>
                Search
              </button>
            </div>

          </div>
        )}

        {/* ================= CREATE ================= */}
        {mode === "create" && (
          <div className="two-column">

            {/* LEFT */}
            <div className="card">
              <h2>Create Prescription</h2>

              <div className="form-group">
                <input className="input-field" placeholder="Appointment ID"
                  value={form.appointment_id}
                  onChange={(e) => setForm({ ...form, appointment_id: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input className="input-field" placeholder="Medication ID"
                  value={form.medication_id}
                  onChange={(e) => setForm({ ...form, medication_id: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input className="input-field" placeholder="Dosage"
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input className="input-field" placeholder="Frequency"
                  value={form.frequency}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input className="input-field" placeholder="Duration"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </div>

              <button className="primary-btn full-width" onClick={createPrescription}>
                Submit Prescription
              </button>

              {created && (
                <div className="result-card">
                  <h3>Prescription Created</h3>
                  <p><b>Appointment:</b> {created.appointment_id}</p>
                  <p><b>Medication ID:</b> {created.medication_id}</p>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="card">
              <h2>Medicine Lookup</h2>

              <div className="search-box">
                <input
                  className="input-field"
                  placeholder="Search medicine"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="btn-row">
                <button className="primary-btn small-btn" onClick={searchMedicine}>Search</button>
                <button className="primary-btn small-btn" onClick={getAllMedicines}>All</button>
              </div>

              {medications.length > 0 && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((m) => (
                      <tr key={m.medication_id}>
                        <td>{m.medication_id}</td>
                        <td>{m.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}

        {/* ================= LOOKUP ================= */}
        {mode === "lookup" && (
          <div className="single-column">
            <div className="card">

              <h2>Prescription Lookup</h2>

              <div className="search-box">
                <input
                  className="input-field"
                  placeholder="Appointment ID"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
                <button className="primary-btn" onClick={getPrescription}>
                  Search
                </button>
              </div>

              {prescriptions.map((p, i) => (
                <div key={i} className="result-card">
                  <p><b>Medicine:</b> {p.medication_name}</p>
                  <p><b>Dosage:</b> {p.dosage}</p>
                  <p><b>Frequency:</b> {p.frequency}</p>
                  <p><b>Duration:</b> {p.duration}</p>
                </div>
              ))}

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Prescription;