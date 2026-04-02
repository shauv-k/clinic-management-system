import { useState } from "react";
import { createPatient } from "../api/patientApi";
import "../styles/form.css";

function Test() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    address: ""
  });

  const handleSubmit = async () => {
    try {
      // ✅ Ensure correct format YYYY-MM-DD
      const formatted = {
        ...form,
        dob: new Date(form.dob).toISOString().split("T")[0]
      };

      console.log("Sending:", formatted);

      await createPatient(formatted);

      alert("✅ Patient created successfully!");

      // reset form
      setForm({
        name: "",
        gender: "",
        dob: "",
        phone: "",
        address: ""
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Error creating patient");
    }
  };

  return (
    <div className="form-container">
      <h2>Test Patient API</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* ✅ dropdown for valid gender */}
      <select
        value={form.gender}
        onChange={(e) =>
          setForm({ ...form, gender: e.target.value })
        }
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      {/* ✅ correct date input */}
      <input
        type="date"
        value={form.dob}
        onChange={(e) =>
          setForm({ ...form, dob: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <button onClick={handleSubmit}>
        Create Patient
      </button>
    </div>
  );
}

export default Test;