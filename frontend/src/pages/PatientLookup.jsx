import { useState } from "react";
import axios from "axios";

function PatientLookup({ setPatient, go }) {
  const [phone, setPhone] = useState("");

  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/phone/${phone}`
      );

      setPatient(res.data);
      go("department");

    } catch {
      alert("Patient not found");
    }
  };

  return (
    <div>
      <h2>Search Patient</h2>

      <input
        placeholder="Enter phone"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={search}>Search</button>
    </div>
  );
}

export default PatientLookup;