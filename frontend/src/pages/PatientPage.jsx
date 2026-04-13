import { useState } from "react";
import axios from "axios";
import "./PatientPage.css";

function PatientPage({ go }) {
  const [searchPhone, setSearchPhone] = useState("");
  const [patient, setPatient] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    address: ""
  });

  // 🔍 LOOKUP: GET /patients/by-phone/{phone}
  const handleSearch = async () => {
    if (!searchPhone) return alert("Please enter a phone number");
    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${searchPhone}`
      );

      if (!res.data || res.data.error) {
        setPatient(null);
        alert("No patient found");
        return;
      }
      setPatient(res.data);
    } catch (err) {
      setPatient(null);
      alert("No patient found");
    }
  };

  // ➕ REGISTER: POST /patients/
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending exact payload as per your schema
      await axios.post("http://localhost:8000/patients/", formData);
      alert("Patient created successfully!");
      setFormData({ name: "", gender: "", dob: "", phone: "", address: "" });
    } catch (err) {
      alert("Error creating patient");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => go("dashboard")}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <h1>Patient Management</h1>
        </div>
        <p>Search records or register a new patient</p>
      </header>

      <main className="management-grid">
        {/* 🔍 Patient Lookup Section */}
        <section className="management-section">
          <div className="card">
            <h2><i className="fa-solid fa-magnifying-glass"></i> Patient Lookup</h2>

            <div className="search-box">
              <input
                type="tel"
                placeholder="Enter Phone Number..."
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
              <button className="card-button" onClick={handleSearch}>Search</button>
            </div>

            {patient ? (
              <div className="patient-result-card">
                <div className="result-header">
                  <div className="avatar-circle"><i className="fa-solid fa-user"></i></div>
                  <div className="result-title">
                    <span className="patient-id">ID: #{patient.patient_id}</span>
                    <h3>Patient Details</h3>
                  </div>
                </div>

                <div className="detail-row"><span><strong>Name:</strong></span><span>{patient.name}</span></div>
                <div className="detail-row"><span><strong>Phone:</strong></span><span>{patient.phone}</span></div>
                <div className="detail-row"><span><strong>Gender:</strong></span><span>{patient.gender}</span></div>
                <div className="detail-row"><span><strong>DOB:</strong></span><span>{patient.dob}</span></div>
                <div className="detail-row"><span><strong>Address:</strong></span><span>{patient.address}</span></div>
              </div>
            ) : (
              <p className="placeholder-text">Enter phone number to view results.</p>
            )}
          </div>
        </section>

        {/* ➕ Registration Section */}
        <section className="management-section">
          <div className="card">
            <h2><i className="fa-solid fa-user-plus"></i> Patient Registration</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" id="name" required value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select id="gender" required value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" id="dob" required value={formData.dob} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" id="phone" required value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" id="address" required value={formData.address} onChange={handleChange} />
              </div>

              <button type="submit" className="card-button submit-btn">Register Patient</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PatientPage;