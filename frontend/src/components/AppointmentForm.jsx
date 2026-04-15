// src/components/AppointmentForm.jsx
import { useState } from "react";
import { bookAppointment } from "../api/appointmentApi";

function AppointmentForm() {
  const [data, setData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_datetime: ""
  });

  const handleSubmit = async () => {
    await bookAppointment(data);
    alert("Appointment booked!");
  };

  return (
    <div>
      <h3>Book Appointment</h3>
      <input placeholder="Patient ID" onChange={e => setData({...data, patient_id: e.target.value})} />
      <input placeholder="Doctor ID" onChange={e => setData({...data, doctor_id: e.target.value})} />
      <input placeholder="YYYY-MM-DD HH:MM:SS" onChange={e => setData({...data, appointment_datetime: e.target.value})} />
      <button onClick={handleSubmit}>Book</button>
    </div>
  );
}

export default AppointmentForm;