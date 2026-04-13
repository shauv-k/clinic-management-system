import { useState } from "react";
import axios from "axios";
import "./AppointmentPage.css";

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

  // 🔍 SEARCH PATIENT
  const searchPatient = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/patients/by-phone/${phone}`);
      setPatient(res.data);
    } catch {
      alert("Patient not found");
      setPatient(null);
    }
  };

  // 👨‍⚕️ GET DOCTORS
  const getDoctors = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/doctors/by-department-name/${spec}`);
      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch {
      setDoctors([]);
    }
  };

  // 📅 CREATE APPOINTMENT
  const book = async () => {
    try {
      if (!dateTime || !patient || !doctor) {
        alert("Fill all fields");
        return;
      }

      const payload = {
        patient_id: Number(patient.patient_id),
        doctor_id: Number(doctor.doctor_id),
        appointment_datetime: dateTime + ":00", // ✅ Applied your fix
        status: "SCHEDULED" // ✅ Applied backend requirement
      };

      await axios.post("http://localhost:8000/appointments/", payload);
      alert("✅ Appointment booked!");
      setDoctor(null); // Reset after booking
    } catch (err) {
      alert(err.response?.data?.detail || "❌ Booking failed");
    }
  };

  // 🔍 LOOKUP APPOINTMENTS
  const lookupAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/appointments/by-patient/${lookupId}`);
      setAppointments(res.data);
    } catch {
      alert("No appointments found");
      setAppointments([]);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => go("dashboard")}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <h1>Appointment Management</h1>
        </div>
      </header>

      <main className="management-grid">
        {/* SECTION 1: CREATE APPOINTMENT */}
        <section className="management-section">
          <div className="card">
            <h2><i className="fa-solid fa-calendar-plus"></i> Create Appointment</h2>

            <div className="search-box">
              <input
                placeholder="Enter patient phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button className="card-button" onClick={searchPatient}>Search</button>
            </div>

            {patient && (
              <div className="patient-info-mini">
                <p><strong>Patient:</strong> {patient.name} (ID: {patient.patient_id})</p>
                <div className="search-box">
                  <label>Specialization</label>
                  <select
                    id="spec"
                    required
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                  >
                    <option value="" disabled>Select Specialization</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                  <button className="card-button outline" onClick={getDoctors}>Find Doctors</button>
                </div>
              </div>
            )}

            <div className="doctor-grid">
              {doctors.map((d) => (
                <div key={d.doctor_id} className={`doc-mini-card ${doctor?.doctor_id === d.doctor_id ? 'selected' : ''}`}>
                  <h4>{d.name}</h4>
                  <p>{d.specialization}</p>
                  <button className="select-btn" onClick={() => setDoctor(d)}>
                    {doctor?.doctor_id === d.doctor_id ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>

            {doctor && (
              <div className="booking-final">
                <label>Select Date & Time</label>
                <input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} />
                <button className="card-button" onClick={book}>Confirm Booking</button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: APPOINTMENT LOOKUP */}
        <section className="management-section">
          <div className="card">
            <h2><i className="fa-solid fa-calendar-check"></i> Appointment Lookup</h2>
            <div className="search-box">
              <input
                placeholder="Enter Patient ID"
                onChange={(e) => setLookupId(e.target.value)}
              />
              <button className="card-button" onClick={lookupAppointments}>Search</button>
            </div>

            <div className="appointment-list">
              {appointments.map((a) => (
                <div key={a.appointment_id} className="appt-item">
                  <div className="appt-meta">
                    <span className="appt-id">ID: #{a.appointment_id}</span>
                    <span className={`status-badge ${a.status.toLowerCase()}`}>{a.status}</span>
                  </div>
                  <p><strong>Doctor ID:</strong> {a.doctor_id}</p>
                  <p><strong>Date:</strong> {new Date(a.appointment_datetime).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AppointmentPage;