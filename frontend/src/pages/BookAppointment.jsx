import { useState } from "react";
import axios from "axios";

function BookAppointment({ patient, doctor, go }) {
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const book = async () => {
    try {
      if (!dateTime) {
        alert("Select date and time");
        return;
      }

      if (!patient || !doctor) {
        alert("Missing patient or doctor info");
        return;
      }

      setLoading(true);

      // ✅ FIX: Ensure proper datetime format (adds seconds)
      const formattedDateTime = dateTime.length === 16
        ? dateTime + ":00"
        : dateTime;

      const payload = {
        patient_id: Number(patient.patient_id),   // ✅ ensure int
        doctor_id: Number(doctor.doctor_id),      // ✅ ensure int
        appointment_datetime: formattedDateTime,  // ✅ FIXED
        status: "SCHEDULED"
      };

      console.log("📤 Sending:", payload);

      await axios.post(
        "http://localhost:8000/appointments/",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("✅ Appointment booked successfully!");
      setDateTime("");
      go("patient");

    } catch (err) {
      console.error("❌ ERROR:", err.response?.data || err.message);

      const msg =
        err.response?.data?.detail ||
        "Booking failed (slot may be taken / invalid data)";

      alert(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Confirm Appointment</h2>

      {/* DETAILS */}
      <div style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        width: "300px"
      }}>
        <p><b>Patient ID:</b> {patient?.patient_id}</p>
        <p><b>Patient Name:</b> {patient?.name}</p>

        <p><b>Doctor ID:</b> {doctor?.doctor_id}</p>
        <p><b>Doctor:</b> {doctor?.name}</p>
        <p><b>Specialization:</b> {doctor?.specialization}</p>
      </div>

      <br />

      {/* DATETIME */}
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />

      <br /><br />

      <button onClick={book} disabled={loading}>
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>
    </div>
  );
}

export default BookAppointment;