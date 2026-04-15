import { useState } from "react";
import axios from "axios";

function Appointment({ go }) {
  const [mode, setMode] = useState("");

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    datetime: "",
    status: "SCHEDULED"
  });

  const [phone, setPhone] = useState("");
  const [appointments, setAppointments] = useState([]);

  const [updateId, setUpdateId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  // ================= CREATE =================
  const createAppointment = async () => {
    try {
      const payload = {
        patient_id: Number(form.patient_id),
        doctor_id: Number(form.doctor_id),
        appointment_datetime: new Date(form.datetime).toISOString(),
        status: form.status
      };

      const res = await axios.post(
        "http://localhost:8000/appointments/",
        payload
      );

      alert(`✅ Created! ID: ${res.data.appointment_id}`);

      setForm({
        patient_id: "",
        doctor_id: "",
        datetime: "",
        status: "SCHEDULED"
      });

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.detail || "❌ Error");
    }
  };

  // ================= LOOKUP BY PHONE =================
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/appointments/by-patient/${phone}`
      );

      setAppointments(res.data);
    } catch (err) {
      alert("❌ No appointments found");
      setAppointments([]);
    }
  };

  // ================= UPDATE STATUS =================
  const updateAppointmentStatus = async () => {
    try {
      if (!updateId || !updateStatus) {
        alert("⚠️ Fill all fields");
        return;
      }

      await axios.patch(
        `http://localhost:8000/appointments/${updateId}/status`,
        { status: updateStatus }
      );

      alert("✅ Status updated");

      setUpdateId("");
      setUpdateStatus("");

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.detail || "❌ Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => (mode === "" ? go("dashboard") : setMode(""))}>
        ⬅ Back
      </button>

      <h2>Appointment Management</h2>

      {/* ================= MENU ================= */}
      {mode === "" && (
        <div>
          <button onClick={() => setMode("create")}>Create</button>
          <button onClick={() => setMode("lookup")}>Lookup</button>
          <button onClick={() => setMode("update")}>Update Status</button>
        </div>
      )}

      {/* ================= CREATE ================= */}
      {mode === "create" && (
        <div>
          <h3>Create Appointment</h3>

          <input
            placeholder="Patient ID"
            value={form.patient_id}
            onChange={(e) =>
              setForm({ ...form, patient_id: e.target.value })
            }
          />

          <input
            placeholder="Doctor ID"
            value={form.doctor_id}
            onChange={(e) =>
              setForm({ ...form, doctor_id: e.target.value })
            }
          />

          <input
            type="datetime-local"
            value={form.datetime}
            onChange={(e) =>
              setForm({ ...form, datetime: e.target.value })
            }
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="NO_SHOW">NO SHOW</option>
          </select>

          <button onClick={createAppointment}>
            Create Appointment
          </button>
        </div>
      )}

      {/* ================= LOOKUP ================= */}
      {mode === "lookup" && (
        <div>
          <h3>Lookup by Phone</h3>

          <input
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={getAppointments}>Search</button>

          {appointments.map((a) => (
            <div key={a.appointment_id} style={{ border: "1px solid white", marginTop: "10px", padding: "10px" }}>
              <p><b>ID:</b> {a.appointment_id}</p>
              <p><b>Doctor ID:</b> {a.doctor_id}</p>
              <p><b>Date:</b> {new Date(a.appointment_datetime).toLocaleString()}</p>
              <p><b>Status:</b> {a.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= UPDATE ================= */}
      {mode === "update" && (
        <div>
          <h3>Update Appointment Status</h3>

          <input
            placeholder="Appointment ID"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
          />

          <select
            value={updateStatus}
            onChange={(e) => setUpdateStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="NO_SHOW">NO SHOW</option>
          </select>

          <button onClick={updateAppointmentStatus}>
            Update Status
          </button>
        </div>
      )}
    </div>
  );
}

export default Appointment;