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

  // 🔥 MEDICINE SEARCH
  const [searchName, setSearchName] = useState("");
  const [medications, setMedications] = useState([]);

  // ================= MEDICINE LOOKUP =================
  const searchMedicine = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/medications/by-name/${searchName}`
      );
      setMedications(res.data);
    } catch {
      alert("❌ No medicines found");
      setMedications([]);
    }
  };

  // ================= SELECT MEDICINE =================
  const selectMedicine = (med) => {
    setForm({
      ...form,
      medication_id: med.medication_id
    });
  };

  // ================= CREATE =================
  const createPrescription = async () => {
    try {
      if (!form.appointment_id || !form.medication_id) {
        alert("⚠️ Fill required fields");
        return;
      }

      await axios.post("http://localhost:8000/prescriptions", {
        appointment_id: Number(form.appointment_id),
        medication_id: Number(form.medication_id),
        dosage: form.dosage,
        frequency: form.frequency,
        duration: form.duration
      });

      alert("✅ Prescription added");

      setForm({
        appointment_id: "",
        medication_id: "",
        dosage: "",
        frequency: "",
        duration: ""
      });

      setMode("");
    } catch (err) {
      console.error(err.response?.data);
      alert("❌ Error creating prescription");
    }
  };

  // ================= LOOKUP =================
  const getPrescription = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/prescriptions/${appointmentId}`
      );

      setPrescriptions(res.data);
    } catch {
      alert("❌ No prescription found");
      setPrescriptions([]);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button onClick={() => (mode === "" ? go("dashboard") : setMode(""))}>
          ⬅ Back
        </button>
        <h1>Prescription Management</h1>
      </header>

      {/* ================= MENU ================= */}
      {mode === "" && (
        <div className="mode-selection-container">
          <button onClick={() => setMode("create")}>Create</button>
          <button onClick={() => setMode("lookup")}>Lookup</button>
        </div>
      )}

      {/* ================= CREATE ================= */}
      {mode === "create" && (
        <div style={{ display: "flex", gap: "20px" }}>

          {/* 🔥 LEFT SIDE FORM */}
          <div style={{ flex: 1 }}>
            <h3>Create Prescription</h3>

            <input
              placeholder="Appointment ID"
              value={form.appointment_id}
              onChange={(e) =>
                setForm({ ...form, appointment_id: e.target.value })
              }
            />

            <input
              placeholder="Medication ID (auto-filled)"
              value={form.medication_id}
              readOnly
            />

            <input
              placeholder="Dosage"
              value={form.dosage}
              onChange={(e) =>
                setForm({ ...form, dosage: e.target.value })
              }
            />

            <input
              placeholder="Frequency"
              value={form.frequency}
              onChange={(e) =>
                setForm({ ...form, frequency: e.target.value })
              }
            />

            <input
              placeholder="Duration"
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: e.target.value })
              }
            />

            <button onClick={createPrescription}>
              Submit Prescription
            </button>
          </div>

          {/* 🔥 RIGHT SIDE MEDICINE SEARCH */}
          <div style={{ flex: 1 }}>
            <h3>Medicine Lookup</h3>

            <input
              placeholder="Search medicine name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

            <button onClick={searchMedicine}>Search</button>

            {medications.map((m) => (
              <div
                key={m.medication_id}
                style={{
                  border: "1px solid #ccc",
                  marginTop: "10px",
                  padding: "10px",
                  cursor: "pointer"
                }}
                onClick={() => selectMedicine(m)}
              >
                <p><b>{m.name}</b></p>
                <p>ID: {m.medication_id}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= LOOKUP ================= */}
      {mode === "lookup" && (
        <div>
          <h3>Lookup Prescription</h3>

          <input
            placeholder="Appointment ID"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
          />

          <button onClick={getPrescription}>Search</button>

          {prescriptions.map((p, i) => (
            <div key={i} style={{ border: "1px solid white", marginTop: "10px", padding: "10px" }}>
              <p><b>Medicine:</b> {p.medication_name}</p>
              <p><b>Dosage:</b> {p.dosage}</p>
              <p><b>Frequency:</b> {p.frequency}</p>
              <p><b>Duration:</b> {p.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Prescription;