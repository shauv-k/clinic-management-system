import { useEffect, useState } from "react";
import { getDoctors } from "../../api/doctorApi";
import { bookAppointment } from "../../api/appointmentApi";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    doctor_id: ""
  });

  useEffect(() => {
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = async () => {
    await bookAppointment(form);
    alert("Appointment booked");
  };

  return (
    <div>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Gender"
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      />

      <select
        onChange={(e) =>
          setForm({ ...form, doctor_id: e.target.value })
        }
      >
        <option>Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Book</button>
    </div>
  );
}

export default BookAppointment;