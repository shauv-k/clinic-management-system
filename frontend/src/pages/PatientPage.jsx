import { useState } from "react";
import axios from "axios";

function PatientPage({ setPatient, setSpecialization, go }) {
  const [phone, setPhone] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [spec, setSpec] = useState("");

  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    address: ""
  });

  // 🔍 SEARCH PATIENT
  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${phone}`
      );

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      setPatientData(res.data);

    } catch (err) {
      console.error(err);
      alert("Patient not found");
    }
  };

  // ➕ CREATE PATIENT
  const create = async () => {
    try {
      const formatted = {
        ...form,
        dob: new Date(form.dob).toISOString().split("T")[0]
      };

      await axios.post("http://localhost:8000/patients/", formatted);

      // auto fetch after create
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${form.phone}`
      );

      setPatientData(res.data);

    } catch (err) {
      console.error(err);
      alert("Error creating patient");
    }
  };

  // ➡️ NEXT STEP
  const proceed = () => {
    if (!spec) {
      alert("Enter specialization");
      return;
    }

    setPatient(patientData);
    setSpecialization(spec);

    go("doctor");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patient</h2>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={search}>Search</button>

      <hr />

      {/* ➕ CREATE */}
      <h3>Create Patient</h3>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setForm({ ...form, gender: e.target.value })
        }
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, dob: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        placeholder="Address"
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <button onClick={create}>Create</button>

      {/* ✅ PATIENT DETAILS CARD */}
      {patientData && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            width: "320px"
          }}
        >
          <h3>Patient Details</h3>

          <p><b>ID:</b> {patientData.patient_id}</p>
          <p><b>Name:</b> {patientData.name}</p>
          <p><b>Gender:</b> {patientData.gender}</p>
          <p><b>Phone:</b> {patientData.phone}</p>
          <p><b>Address:</b> {patientData.address}</p>

          <hr />

          <h4>Enter Specialization</h4>

          <input
            placeholder="Cardiology / Neurology"
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
          />

          <br /><br />

          <button onClick={proceed}>
            Find Doctors
          </button>
        </div>
      )}
    </div>
  );
}

export default PatientPage;