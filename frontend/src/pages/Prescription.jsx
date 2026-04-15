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

  // 🔍 Medicine lookup
  const [searchName, setSearchName] = useState("");
  const [medications, setMedications] = useState([]);

  // ================= SEARCH MEDICINE =================
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

  // ================= GET ALL =================
  const getAllMedicines = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/medications"
      );
      setMedications(res.data);
    } catch {
      setMedications([]);
    }
  };

  // ================= CREATE =================
  const createPrescription = async () => {
    try {
      if (!form.appointment_id || !form.medication_id) {
        alert("⚠️ Fill required fields");
        return;
      }

      const payload = {
        appointment_id: Number(form.appointment_id),
        medication_id: Number(form.medication_id),
        dosage: form.dosage,
        frequency: form.frequency,
        duration: form.duration
      };

      await axios.post("http://localhost:8000/prescriptions", payload);

      // 🔥 ALWAYS FETCH MEDICINE NAME FROM BACKEND
      let medName = "Unknown";

      try {
        const res = await axios.get("http://localhost:8000/medications");

        const med = res.data.find(
          (m) => m.medication_id === Number(form.medication_id)
        );

        if (med) medName = med.name;
      } catch {
        // fallback remains "Unknown"
      }

      setCreated({
        appointment_id: form.appointment_id,
        medication_name: medName,
        dosage: form.dosage,
        frequency: form.frequency,
        duration: form.duration
      });

      // reset form
      setForm({
        appointment_id: "",
        medication_id: "",
        dosage: "",
        frequency: "",
        duration: ""
      });

    } catch (err) {
      alert(err.response?.data?.detail || "❌ Error creating prescription");
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
          <button onClick={() => setMode("create")}>
            Create Prescription
          </button>
          <button onClick={() => setMode("lookup")}>
            Prescription Lookup
          </button>
        </div>
      )}

      {/* ================= CREATE ================= */}
      {mode === "create" && (
        <div style={{ display: "flex", gap: "20px" }}>

          {/* LEFT */}
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
              placeholder="Medication ID"
              value={form.medication_id}
              onChange={(e) =>
                setForm({ ...form, medication_id: e.target.value })
              }
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

            {/* ✅ RESULT */}
            {created && (
              <div style={{
                border: "2px solid green",
                marginTop: "15px",
                padding: "10px"
              }}>
                <h4>✅ Prescription Created</h4>
                <p><b>Appointment ID:</b> {created.appointment_id}</p>
                <p><b>Medicine:</b> {created.medication_name}</p>
                <p><b>Dosage:</b> {created.dosage}</p>
                <p><b>Frequency:</b> {created.frequency}</p>
                <p><b>Duration:</b> {created.duration}</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div style={{ flex: 1 }}>
            <h3>Medicine Lookup</h3>

            <input
              placeholder="Search medicine"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={searchMedicine}>Search</button>
              <button onClick={getAllMedicines}>Get All</button>
            </div>

            {medications.length > 0 && (
              <table style={{
                width: "100%",
                marginTop: "15px",
                borderCollapse: "collapse"
              }}>
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
        <div>
          <h3>Prescription Lookup</h3>

          <input
            placeholder="Appointment ID"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
          />

          <button onClick={getPrescription}>Search</button>

          {prescriptions.map((p, i) => (
            <div key={i} style={{
              border: "1px solid #ccc",
              marginTop: "10px",
              padding: "10px"
            }}>
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