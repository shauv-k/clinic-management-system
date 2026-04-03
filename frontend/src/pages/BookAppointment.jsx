import { useState } from "react";
import axios from "axios";

function BookAppointment({ patient, doctor, go }) {
  const [dateTime, setDateTime] = useState("");

  const book = async () => {
    try {
      if (!dateTime) {
        alert("Select date and time");
        return;
      }

      const payload = {
        patient_id: patient.patient_id,   // ✅ ID based
        doctor_id: doctor.doctor_id,      // ✅ ID based
        appointment_datetime: dateTime,
        status: "SCHEDULED"               // ✅ MUST BE UPPERCASE
      };

      console.log("Sending:", payload);

      await axios.post("http://localhost:8000/appointments/", payload);

      alert("✅ Appointment booked successfully!");

      go("patient"); // go back

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Booking failed (slot may be taken)");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Confirm Appointment</h2>

      {/* ✅ SHOW DETAILS */}
      <div style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        width: "300px"
      }}>
        <p><b>Patient ID:</b> {patient.patient_id}</p>
        <p><b>Patient Name:</b> {patient.name}</p>

        <p><b>Doctor ID:</b> {doctor.doctor_id}</p>
        <p><b>Doctor:</b> {doctor.name}</p>
        <p><b>Specialization:</b> {doctor.specialization}</p>
      </div>

      <br />

      {/* ✅ DATETIME */}
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />

      <br /><br />

      <button onClick={book}>
        Confirm Appointment
      </button>
    </div>
  );
}

export default BookAppointment;