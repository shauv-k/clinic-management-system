import { useState } from "react";
import axios from "axios";

function AppointmentLookup({ goBack }) {
  const [phone, setPhone] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const search = async () => {
    try {
      setMessage("");

      if (!phone) {
        setType("error");
        setMessage("⚠️ Please enter phone number");
        return;
      }

      const res = await axios.get(
        `http://localhost:8000/appointments/by-patient/${phone}`
      );

      if (!res.data || res.data.length === 0) {
        setAppointments([]);
        setType("error");
        setMessage("❌ No appointments found");
        return;
      }

      setAppointments(res.data);

    } catch (err) {
      setAppointments([]);
      setType("error");
      setMessage("❌ Failed to fetch appointments");
    }
  };

  // 📅 FORMAT DATE
  const formatDate = (dt) => {
    return new Date(dt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔴 ERROR BANNER ONLY */}
      {message && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: "#7f1d1d",
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

      <h3>Lookup by Phone</h3>

      {/* SEARCH */}
      <div style={{ marginTop: "10px" }}>
        <input
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <button onClick={search} style={buttonStyle}>
          Search
        </button>
      </div>

      {/* TABLE */}
      {appointments.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            overflowX: "auto",
            backgroundColor: "#1e1e1e",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              color: "white",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #666" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.appointment_id} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{a.appointment_id}</td>
                  <td style={tdStyle}>{a.patient_name}</td>
                  <td style={tdStyle}>{a.doctor_name}</td>
                  <td style={tdStyle}>{a.department}</td>
                  <td style={tdStyle}>
                    {formatDate(a.appointment_datetime)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      color:
                        a.status === "COMPLETED"
                          ? "#4CAF50"
                          : a.status === "CANCELLED"
                          ? "#f44336"
                          : a.status === "NO_SHOW"
                          ? "#ff9800"
                          : "#2196f3",
                      fontWeight: "bold",
                    }}
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// 🎨 STYLES
const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "4px",
  border: "1px solid #666",
  background: "#2a2a2a",
  color: "white",
};

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
};

const thStyle = {
  padding: "10px",
  wordWrap: "break-word",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #444",
  wordWrap: "break-word",
  whiteSpace: "normal",
};

export default AppointmentLookup;