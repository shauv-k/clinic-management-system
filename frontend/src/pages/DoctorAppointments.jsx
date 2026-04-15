import { useEffect, useState } from "react";
import axios from "axios";

function DoctorAppointments({ doctor, go }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(
      `http://localhost:8000/appointments/by-doctor/${doctor.staff_id}`
    )
    .then(res => setData(res.data));
  }, [doctor]);

  return (
    <div>
      <h2>Appointments</h2>

      {data.map((a, i) => (
        <div key={i}>
          Patient ID: {a.patient_id} | {a.status}
        </div>
      ))}

      <button onClick={() => go("book")}>
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorAppointments;