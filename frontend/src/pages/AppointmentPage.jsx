import { useState } from "react";
import axios from "axios";

function Appointment({ go }) {
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);

  const [spec, setSpec] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [dateTime, setDateTime] = useState("");

  const [createdId, setCreatedId] = useState(null);

  // ================= PATIENT SEARCH =================
  const getPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${phone}`
      );

      if (res.data.error) {
        alert("❌ Patient not found");
        setPatient(null);
        return;
      }

      setPatient(res.data);
    } catch {
      alert("❌ Patient not found");
      setPatient(null);
    }
  };

  // ================= DOCTOR SEARCH =================
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/doctors/by-department-name/${spec}`
      );

      setDoctors(res.data || []);
    } catch {
      setDoctors([]);
    }
  };

  // ================= CREATE APPOINTMENT =================
  const createAppointment = async () => {
    try {
      if (!patient || !selectedDoctor || !dateTime) {
        alert("⚠️ Fill all fields");
        return;
      }

      const payload = {
        patient_id: patient.patient_id,
        doctor_id: selectedDoctor.doctor_id,
        appointment_datetime: new Date(dateTime).toISOString(),
        status: "SCHEDULED"
      };

      const res = await axios.post(
        "http://localhost:8000/appointments/",
        payload
      );

      setCreatedId(res.data.appointment_id);

      alert("✅ Appointment Created!");

      // reset (optional)
      setSelectedDoctor(null);
      setDateTime("");

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.detail || "❌ Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => go("dashboard")}>⬅ Back</button>

      <h2>Create Appointment</h2>

      {/* ================= PATIENT ================= */}
      <h3>Step 1: Find Patient</h3>

      <input
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={getPatient}>Search</button>

      {patient && (
        <div style={{ marginTop: "10px" }}>
          <p><b>Name:</b> {patient.name}</p>
          <p><b>ID:</b> {patient.patient_id}</p>
        </div>
      )}

      {/* ================= DOCTOR ================= */}
      {patient && (
        <>
          <h3>Step 2: Select Doctor</h3>

          <input
            placeholder="Enter specialization"
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
          />

          <button onClick={getDoctors}>Find Doctors</button>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
            {doctors.map((d) => (
              <div
                key={d.doctor_id}
                style={{
                  border: "1px solid white",
                  padding: "10px",
                  width: "200px"
                }}
              >
                <p><b>{d.name}</b></p>
                <p>{d.specialization}</p>

                <button onClick={() => setSelectedDoctor(d)}>
                  Select
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= DATETIME ================= */}
      {selectedDoctor && (
        <>
          <h3>Step 3: Select Date & Time</h3>

          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </>
      )}

      {/* ================= CREATE BUTTON ================= */}
      {dateTime && (
        <>
          <br /><br />
          <button onClick={createAppointment}>
            Create Appointment
          </button>
        </>
      )}

      {/* ================= RESULT ================= */}
      {createdId && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "2px solid green"
          }}
        >
          <h3>✅ Appointment Created</h3>
          <p><b>Appointment ID:</b> {createdId}</p>
        </div>
      )}
    </div>
  );
}

export default Appointment;