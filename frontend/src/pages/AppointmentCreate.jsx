import { useState } from "react";
import axios from "axios";

function AppointmentCreate({ goBack }) {
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);

  const [department, setDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const [dateTime, setDateTime] = useState("");
  const [result, setResult] = useState(null);

  const [banner, setBanner] = useState({ message: "", type: "" });

  // 📅 FORMAT DATE
  const formatDate = (dt) => {
    return new Date(dt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 🔍 PATIENT
  const getPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${phone}`
      );

      if (res.data.error) {
        setPatient(null);
        return;
      }

      setPatient(res.data);
    } catch {
      setPatient(null);
    }
  };

  // 👨‍⚕️ DOCTORS
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

  // ✅ CREATE
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
        message: `✅ Appointment Created (ID: ${res.data.appointment_id})`,
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
          message: "❌ Doctor is occupied at this time. Choose another slot.",
          type: "error",
        });
      } else {
        setBanner({
          message: "❌ Failed to create appointment",
          type: "error",
        });
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={goBack}>⬅ Back</button>
      <h3>Create Appointment</h3>

      {/* 🔍 PATIENT */}
      <div style={{ marginTop: "10px" }}>
        <input
          placeholder="Patient Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
        <button onClick={getPatient} style={buttonStyle}>
          Search
        </button>
      </div>

      {/* ✅ PATIENT TABLE */}
      {patient && (
        <table style={tableStyle}>
          <tbody>
            <tr><td><b>ID</b></td><td>{patient.patient_id}</td></tr>
            <tr><td><b>Name</b></td><td>{patient.name}</td></tr>
            <tr><td><b>Phone</b></td><td>{patient.phone}</td></tr>
            <tr><td><b>Gender</b></td><td>{patient.gender}</td></tr>
            <tr><td><b>DOB</b></td><td>{formatDate(patient.dob)}</td></tr>
            <tr><td><b>Address</b></td><td>{patient.address}</td></tr>
          </tbody>
        </table>
      )}

      {/* 🏥 DEPARTMENT */}
      {patient && (
        <div style={{ marginTop: "10px" }}>
          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={inputStyle}
          />
          <button onClick={getDoctors} style={buttonStyle}>
            Get Doctors
          </button>
        </div>
      )}

      {/* 👨‍⚕️ DOCTORS TABLE */}
      {doctors.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.doctor_id} style={{ textAlign: "center" }}>
                <td>{d.doctor_id}</td>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td>
                  <button onClick={() => setDoctor(d)} style={buttonStyle}>
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 📅 DATE */}
      {doctor && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            style={inputStyle}
          />
        </div>
      )}

      {/* CREATE BUTTON */}
      {dateTime && (
        <button
          onClick={createAppointment}
          style={{ ...buttonStyle, marginTop: "10px" }}
        >
          Create Appointment
        </button>
      )}

      {/* RESULT BOX */}
      {result && (
        <div style={resultBox}>
          <h4>Appointment Created</h4>
          <p><b>ID:</b> {result.id}</p>
          <p><b>Doctor:</b> {result.doctor}</p>
          <p><b>Department:</b> {result.department}</p>
          <p><b>Date:</b> {result.date}</p>
        </div>
      )}

      {/* 🔥 BOTTOM BANNER */}
      {banner.message && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "15px",
            backgroundColor:
              banner.type === "success" ? "#14532d" : "#7f1d1d",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <span>{banner.message}</span>

          <button
            onClick={() => setBanner({ message: "", type: "" })}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ❌
          </button>
        </div>
      )}
    </div>
  );
}

/* 🔥 STYLES */
const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "4px",
  border: "1px solid #666",
};

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  marginTop: "10px",
  borderCollapse: "collapse",
};

const resultBox = {
  border: "2px solid green",
  marginTop: "15px",
  padding: "10px",
};

export default AppointmentCreate;