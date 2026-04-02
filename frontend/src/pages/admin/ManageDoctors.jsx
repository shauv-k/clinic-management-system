import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/form.css";
import "../../styles/table.css";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: ""
  });

  // Load doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await axios.get("http://127.0.0.1:8000/doctors");
    setDoctors(res.data);
  };

  // Add doctor
  const addDoctor = async () => {
    await axios.post("http://127.0.0.1:8000/doctors", form);
    alert("Doctor added");
    fetchDoctors(); // refresh list
  };

  return (
    <div>
      <h2>Manage Doctors</h2>

      {/* ADD DOCTOR FORM */}
      <div className="form-container">
        <h3>Add Doctor</h3>

        <input
          placeholder="Doctor Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Specialization"
          onChange={(e) =>
            setForm({ ...form, specialization: e.target.value })
          }
        />

        <button onClick={addDoctor}>Add Doctor</button>
      </div>

      {/* DOCTOR TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageDoctors;