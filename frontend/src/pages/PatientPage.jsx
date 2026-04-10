import { useState } from "react";
import axios from "axios";

function PatientPage({ go }) {
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);

  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    address: ""
  });

  // 🔍 LOOKUP
  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${phone}`
      );

      if (res.data.error) {
        setPatient(null);
        alert("No patient found");
        return;
      }

      setPatient(res.data);
    } catch {
      alert("No patient found");
    }
  };

  // ➕ REGISTER
  const create = async () => {
    const formatted = {
      ...form,
      dob: new Date(form.dob).toISOString().split("T")[0]
    };

    await axios.post("http://localhost:8000/patients/", formatted);
    alert("Patient created");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => go("dashboard")}>⬅ Back</button>

      <h2>Patient Management</h2>

      {/* 🔍 LOOKUP */}
      <h3>Search Patient</h3>
      <input
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={search}>Search</button>

      {/* RESULT */}
      {patient ? (
        <div style={{ border: "1px solid white", padding: "10px", marginTop: "10px" }}>
          <p><b>ID:</b> {patient.patient_id}</p>
          <p><b>Name:</b> {patient.name}</p>
          <p><b>Gender:</b> {patient.gender}</p>
          <p><b>Phone:</b> {patient.phone}</p>
          <p><b>Address:</b> {patient.address}</p>
        </div>
      ) : null}

      <hr />

      {/* ➕ REGISTER */}
      <h3>Register Patient</h3>

      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option>Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input type="date"
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />

      <input placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input placeholder="Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <button onClick={create}>Register</button>
    </div>
  );
}

export default PatientPage;