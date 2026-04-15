// src/components/PatientForm.jsx
import { useState } from "react";
import { createPatient } from "../api/patientApi";

function PatientForm() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    phone: ""
  });

  const handleSubmit = async () => {
    await createPatient(form);
    alert("Patient added!");
  };

  return (
    <div>
      <h3>Add Patient</h3>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Gender" onChange={e => setForm({...form, gender: e.target.value})} />
      <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PatientForm;