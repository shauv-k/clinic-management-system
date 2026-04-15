import { useState } from "react";
import axios from "axios";

function AppointmentUpdate({ goBack }) {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [appointment, setAppointment] = useState(null);

  const formatDate = (dt) => {
    return new Date(dt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 🔄 UPDATE
  const update = async () => {
    try {
      setMessage("");

      if (!id || !status) {
        setType("error");
        setMessage("⚠️ Please fill all fields");
        return;
      }

      await axios.patch(
        `http://localhost:8000/appointments/${id}/status`,
        { status }
      );

      setType("success");
      setMessage("✅ Status updated successfully");

      // 🔥 AUTO FETCH AFTER UPDATE
      const res = await axios.get("http://localhost:8000/appointments/");
      const found = res.data.find(
        (a) => a.appointment_id === Number(id)
      );

      setAppointment(found || null);

    } catch (err) {
      setType("error");
      setMessage(err.response?.data?.detail || "❌ Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔥 TRUE TOP BANNER */}
      {message && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            padding: "12px",
            borderRadius: "6px",
            backgroundColor:
              type === "success" ? "#1b5e20" : "#7f1d1d",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          {message}
        </div>
      )}

      <button onClick={goBack}>⬅ Back</button>

      <h3>Update Appointment Status</h3>

      {/* FORM */}
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #444",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px",
          backgroundColor: "#1e1e1e",
          color: "white",
        }}
      >
        <table style={{ width: "100%", borderSpacing: "12px" }}>
          <tbody>
            <tr>
              <td><b>Appointment ID</b></td>
              <td>
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter ID"
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td><b>Status</b></td>
              <td>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select Status</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="NO_SHOW">NO SHOW</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={update}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            fontWeight: "bold",
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            borderRadius: "5px",
          }}
        >
          Update Status
        </button>
      </div>

      {/* DETAILS */}
      {appointment && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #444",
            padding: "15px",
            borderRadius: "8px",
            maxWidth: "600px",
            backgroundColor: "#2a2a2a",
            color: "white",
          }}
        >
          <h4>Appointment Details</h4>

          <table style={{ width: "100%", borderSpacing: "8px" }}>
            <tbody>
              <tr><td><b>ID</b></td><td>{appointment.appointment_id}</td></tr>
              <tr><td><b>Patient</b></td><td>{appointment.patient_name}</td></tr>
              <tr><td><b>Doctor</b></td><td>{appointment.doctor_name}</td></tr>
              <tr><td><b>Department</b></td><td>{appointment.department}</td></tr>
              <tr><td><b>Date</b></td><td>{formatDate(appointment.appointment_datetime)}</td></tr>
              <tr><td><b>Status</b></td><td>{appointment.status}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #666",
  background: "#2a2a2a",
  color: "white",
};

export default AppointmentUpdate;