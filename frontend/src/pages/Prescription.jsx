import { useState } from "react";
import axios from "axios";

function Prescription({ go }) {
  const [mode, setMode] = useState(""); // 🔥 controls UI

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

      setPrescriptions(
        Array.isArray(res.data) ? res.data : [res.data]
      );
    } catch {
      alert("❌ No prescription found");
      setPrescriptions([]);
    }
  };

  // ➕ CREATE
  const createPrescription = async () => {
    try {
      await axios.post(
        "http://localhost:8000/prescriptions",
        form
      );

      alert("✅ Prescription added");

      setForm({
        appointment_id: "",
        medication_id: "",
        dosage: "",
        frequency: "",
        duration: ""
      });

    } catch (err) {
      console.error(err);
      alert("❌ Error creating prescription");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => go("dashboard")}>⬅ Back</button>

      <h2>Prescription</h2>

      {/* 🔥 MAIN OPTIONS */}
      {mode === "" && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setMode("create")}>
            Create Prescription
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setMode("lookup")}
          >
            Lookup Prescription
          </button>
        </div>
      )}

      {/* ================= CREATE ================= */}
      {mode === "create" && (
        <div style={{ marginTop: "20px" }}>
          <h3>➕ Create Prescription</h3>

          <input
            placeholder="Appointment ID"
            value={form.appointment_id}
            onChange={(e) =>
              setForm({ ...form, appointment_id: e.target.value })
            }
          />

          <br />

          <input
            placeholder="Medication ID"
            value={form.medication_id}
            onChange={(e) =>
              setForm({ ...form, medication_id: e.target.value })
            }
          />

          <br />

          <input
            placeholder="Dosage"
            value={form.dosage}
            onChange={(e) =>
              setForm({ ...form, dosage: e.target.value })
            }
          />

          <br />

          <input
            placeholder="Frequency"
            value={form.frequency}
            onChange={(e) =>
              setForm({ ...form, frequency: e.target.value })
            }
          />

          <br />

          <input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
          />

          <br /><br />

          <button onClick={createPrescription}>
            Submit
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setMode("")}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* ================= LOOKUP ================= */}
      {mode === "lookup" && (
        <div style={{ marginTop: "20px" }}>
          <h3>🔍 Lookup Prescription</h3>

          <input
            placeholder="Enter Appointment ID"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
          />

          <button onClick={getPrescription}>
            Search
          </button>

          {/* RESULTS */}
          {prescriptions.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              {prescriptions.map((p, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px"
                  }}
                >
                  <p><b>Appointment ID:</b> {p.appointment_id}</p>
                  <p><b>Medication ID:</b> {p.medication_id}</p>
                  <p><b>Dosage:</b> {p.dosage}</p>
                  <p><b>Frequency:</b> {p.frequency}</p>
                  <p><b>Duration:</b> {p.duration}</p>
                </div>
              ))}
            </div>
          )}

          <button
            style={{ marginTop: "10px" }}
            onClick={() => setMode("")}
          >
            ⬅ Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Prescription;