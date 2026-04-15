import { useState } from "react";
import axios from "axios";
import "./AppointmentCreate.css";

function AppointmentCreate({ goBack, goHome }) {
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);

  const [department, setDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const [dateTime, setDateTime] = useState("");
  const [result, setResult] = useState(null);

  const [banner, setBanner] = useState({ message: "", type: "" });

  const formatDate = (dt) => {
    return new Date(dt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${phone}`
      );

      if (res.data.error) {
        setPatient(null);
        setBanner({ message: "Patient not found", type: "error" });
        return;
      }

      setPatient(res.data);
    } catch {
      setPatient(null);
      setBanner({ message: "Patient not found", type: "error" });
    }
  };

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/doctors/by-department-name/${department}`
      );

      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch {
      setDoctors([]);
    }
  };

  const createAppointment = async () => {
    try {
      setBanner({ message: "", type: "" });

      const res = await axios.post(
        "http://localhost:8000/appointments/",
        {
          patient_id: patient.patient_id,
          doctor_id: doctor.doctor_id,
          appointment_datetime: dateTime,
          status: "SCHEDULED",
        }
      );

      setResult({
        id: res.data.appointment_id,
        doctor: doctor.name,
        department: doctor.specialization,
        date: formatDate(dateTime),
      });

      setBanner({
        message: `Appointment created (ID: ${res.data.appointment_id})`,
        type: "success",
      });

    } catch (err) {
      const msg = err.response?.data?.detail || "";

      if (
        msg.toLowerCase().includes("15") ||
        msg.toLowerCase().includes("slot") ||
        msg.toLowerCase().includes("doctor")
      ) {
        setBanner({
          message: "Doctor is occupied at this time. Choose another slot.",
          type: "error",
        });
      } else {
        setBanner({
          message: "Failed to create appointment",
          type: "error",
        });
      }
    }
  };

  return (
    <div className="dashboard-container">

      {/* 🔥 FIXED HEADER */}
      <header className="app-header">

        <div className="header-left">
          {/* BACK → Appointment page */}
          <button className="back-btn" onClick={goBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="header-center">
          <h1 className="app-title">Create Appointment</h1>
        </div>

        <div className="header-right">
          {/* HOME → Dashboard */}
          <button className="back-btn" onClick={() => goHome("dashboard")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </button>
        </div>

      </header>

      <main className="management-grid single-column">

        <div className="card">

          <h2>Patient Lookup</h2>

          <div className="form-row">
            <input
              className="input-field"
              placeholder="Enter patient phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="primary-btn" onClick={getPatient}>
              Search
            </button>
          </div>

          {patient && (
            <table className="data-table">
              <tbody>
                <tr><td>ID</td><td>{patient.patient_id}</td></tr>
                <tr><td>Name</td><td>{patient.name}</td></tr>
                <tr><td>Phone</td><td>{patient.phone}</td></tr>
                <tr><td>Gender</td><td>{patient.gender}</td></tr>
                <tr><td>DOB</td><td>{formatDate(patient.dob)}</td></tr>
                <tr><td>Address</td><td>{patient.address}</td></tr>
              </tbody>
            </table>
          )}

          {patient && (
            <>
              <h3>Select Department</h3>

              <div className="form-row">
                <input
                  className="input-field"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <button className="primary-btn" onClick={getDoctors}>
                  Get Doctors
                </button>
              </div>
            </>
          )}

          {doctors.length > 0 && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => (
                  <tr key={d.doctor_id}>
                    <td>{d.doctor_id}</td>
                    <td>{d.name}</td>
                    <td>{d.specialization}</td>
                    <td>
                      <button
                        className="primary-btn small-btn"
                        onClick={() => setDoctor(d)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {doctor && (
            <>
              <h3>Select Date & Time</h3>

              <input
                type="datetime-local"
                className="input-field"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </>
          )}

          {dateTime && (
            <button
              className="primary-btn full-width"
              onClick={createAppointment}
            >
              Create Appointment
            </button>
          )}

          {result && (
            <div className="result-card">
              <h3>Appointment Created</h3>
              <p><b>ID:</b> {result.id}</p>
              <p><b>Doctor:</b> {result.doctor}</p>
              <p><b>Department:</b> {result.department}</p>
              <p><b>Date:</b> {result.date}</p>
            </div>
          )}

        </div>
      </main>

      {banner.message && (
        <div className={`banner ${banner.type}`}>
          <span>{banner.message}</span>
          <button onClick={() => setBanner({ message: "", type: "" })}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default AppointmentCreate;