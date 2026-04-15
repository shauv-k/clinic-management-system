import { useState } from "react";
import axios from "axios";
import "./PatientPage.css";

function PatientPage({ go }) {
  const [searchPhone, setSearchPhone] = useState("");
  const [patient, setPatient] = useState(null);
  const [banner, setBanner] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    address: ""
  });

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      dateStyle: "medium",
    });
  };

  const handleSearch = async () => {
    if (!searchPhone) {
      setBanner({ type: "error", text: "Enter phone number" });
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/patients/by-phone/${searchPhone}`
      );

      if (!res.data || res.data.error) {
        setPatient(null);
        setBanner({ type: "error", text: "Patient not found" });
        return;
      }

      setPatient(res.data);
    } catch {
      setPatient(null);
      setBanner({ type: "error", text: "Patient not found" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/patients/", formData);

      setBanner({ type: "success", text: "Patient registered successfully" });

      setFormData({
        name: "",
        gender: "",
        dob: "",
        phone: "",
        address: ""
      });
    } catch {
      setBanner({ type: "error", text: "Error creating patient" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="dashboard-container">

      <header className="app-header">
        <button className="back-btn" onClick={() => go("dashboard")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <h1 className="app-title">Patient Management</h1>

        <div style={{ width: "40px" }}></div>
      </header>

      <main className="patient-layout">

        {/* LEFT */}
        <section className="patient-column">
          <h2>Patient Lookup</h2>

          <div className="search-box">
            <input
              className="input-field"
              type="tel"
              placeholder="Enter Phone Number"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
            <button className="primary-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          {patient ? (
            <div className="patient-result">

              <div className="result-header">
                <div className="avatar-circle">👤</div>

                <div>
                  <h3>{patient.name}</h3>
                  <p>ID: {patient.patient_id}</p>
                </div>
              </div>

              <div className="detail-grid">
                <div><b>Phone:</b> {patient.phone}</div>
                <div><b>Gender:</b> {patient.gender}</div>
                <div><b>DOB:</b> {formatDate(patient.dob)}</div>
                <div><b>Address:</b> {patient.address}</div>
              </div>

            </div>
          ) : (
            <p className="placeholder-text">
              Enter phone number to view patient details
            </p>
          )}
        </section>

        {/* RIGHT */}
        <section className="patient-column glass">
          <h2>Patient Registration</h2>

          <form className="registration-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>
              <input className="input-field" id="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender</label>
                <select className="input-field" id="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input className="input-field" type="date" id="dob" value={formData.dob} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input className="input-field" type="tel" id="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input className="input-field" id="address" value={formData.address} onChange={handleChange} required />
            </div>

            <button type="submit" className="primary-btn">
              Register Patient
            </button>

          </form>
        </section>

      </main>

      {/* BANNER */}
      {banner && (
        <div className={`banner ${banner.type}`}>
          <span>{banner.text}</span>
          <button className="banner-close" onClick={() => setBanner(null)}>✕</button>
        </div>
      )}

    </div>
  );
}

export default PatientPage;