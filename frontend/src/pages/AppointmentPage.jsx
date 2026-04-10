import { useState } from "react";
import axios from "axios";

function AppointmentPage({ go }) {
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);

  const [spec, setSpec] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const [dateTime, setDateTime] = useState("");

  // 🔍 LOOKUP STATES
  const [lookupId, setLookupId] = useState("");
  const [appointments, setAppointments] = useState([]);

  // 🔍 SEARCH PATIENT BY PHONE
  const searchPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${phone}`
      );
      setPatient(res.data);
    } catch {
      alert("Patient not found");
      setPatient(null);
    }
  };

  // 👨‍⚕️ GET DOCTORS BY SPECIALIZATION
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/doctors/by-department-name/${spec}`
      );

      if (Array.isArray(res.data)) {
        setDoctors(res.data);
      } else {
        setDoctors([]);
      }
    } catch {
      setDoctors([]);
    }
  };

  // 📅 CREATE APPOINTMENT
  const book = async () => {
    try {
      await axios.post("http://localhost:8000/appointments/", {
        patient_id: patient.patient_id,
        doctor_id: doctor.doctor_id,
        appointment_datetime: dateTime
        // ❌ NO STATUS (backend handles it)
      });

      alert("✅ Appointment booked!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Booking failed");
    }
  };

  // 🔍 LOOKUP APPOINTMENTS BY PATIENT ID
  const lookupAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/appointments/by-patient/${lookupId}`
      );

      setAppointments(res.data);
    } catch {
      alert("No appointments found");
      setAppointments([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => go("dashboard")}>⬅ Back</button>

      <h2>Appointment</h2>

      {/* 🔍 PATIENT SEARCH */}
      <h3>Create Appointment</h3>

      <input
        placeholder="Enter patient phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={searchPatient}>Search</button>

      {/* PATIENT DETAILS */}
      {patient && (
        <div style={{ marginTop: "10px" }}>
          <p><b>Name:</b> {patient.name}</p>
          <p><b>ID:</b> {patient.patient_id}</p>

          {/* SPECIALIZATION */}
          <input
            placeholder="Cardiology / Neurology"
            onChange={(e) => setSpec(e.target.value)}
          />

          <button onClick={getDoctors}>Find Doctors</button>
        </div>
      )}

      {/* DOCTOR LIST */}
    <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        marginTop: "10px"
        }}>
        {doctors.map((d) => (
            <div
            key={d.doctor_id}
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                width: "250px",
                backgroundColor: "#1e1e1e",
                color: "white"
            }}
            >
            <h3>{d.name}</h3>

            <p><b>Doctor ID:</b> {d.doctor_id}</p>
            <p><b>Specialization:</b> {d.specialization}</p>

            {/* optional fields (safe check) */}
            {d.qualifications && (
                <p><b>Qualification:</b> {d.qualifications}</p>
            )}

            {d.phone && (
                <p><b>Phone:</b> {d.phone}</p>
            )}

            <button
                style={{ marginTop: "10px" }}
                onClick={() => setDoctor(d)}
            >
                Select Doctor
            </button>
            </div>
        ))}
    </div>

      {/* BOOK */}
      {doctor && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="datetime-local"
            onChange={(e) => setDateTime(e.target.value)}
          />

          <button onClick={book}>
            Book Appointment
          </button>
        </div>
      )}

      <hr />

      {/* 🔍 LOOKUP SECTION */}
      <h3>Appointment Lookup</h3>

      <input
        placeholder="Enter Patient ID"
        onChange={(e) => setLookupId(e.target.value)}
      />

      <button onClick={lookupAppointments}>
        Search
      </button>

      {/* RESULTS */}
      {appointments.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          {appointments.map((a) => (
            <div
              key={a.appointment_id}
              style={{
                border: "1px solid white",
                padding: "10px",
                marginBottom: "10px"
              }}
            >
              <p><b>Appointment ID:</b> {a.appointment_id}</p>
              <p><b>Doctor ID:</b> {a.doctor_id}</p>
              <p><b>Date:</b> {a.appointment_datetime}</p>
              <p><b>Status:</b> {a.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentPage;