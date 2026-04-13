import { useState } from "react";
import axios from "axios";
import "./Billing.css";

function Billing({ go }) {
  const [mode, setMode] = useState(""); // "" (selection), "create", or "lookup"
  const [appointmentId, setAppointmentId] = useState("");
  const [bill, setBill] = useState(null);
  const [updateMode, setUpdateMode] = useState("");

  const [form, setForm] = useState({
    appointment_id: "",
    amount: "",
    payment_mode: ""
  });

  // ================= CREATE BILL =================
  const createBill = async () => {
    try {
      const payload = {
        appointment_id: Number(form.appointment_id),
        amount: Number(form.amount),
        payment_mode: form.payment_mode || null
      };

      await axios.post("http://localhost:8000/billing", payload);
      alert("✅ Bill created successfully");
      setForm({ appointment_id: "", amount: "", payment_mode: "" });
      setMode(""); // Return to selection
    } catch (err) {
      alert("❌ Error creating bill");
    }
  };

  // ================= GET BILL =================
  const getBill = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/billing/${appointmentId}`);
      setBill(res.data);
    } catch (err) {
      alert("❌ Bill not found");
      setBill(null);
    }
  };

  // ================= UPDATE PAYMENT =================
  const updatePayment = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/billing/${appointmentId}?mode=${updateMode || ""}`
      );
      alert("✅ Payment mode updated");
      getBill(); // Refresh current bill view
      setUpdateMode("");
    } catch (err) {
      alert("❌ Update failed");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => (mode === "" ? go("dashboard") : setMode(""))}>
            <i className="fa-solid fa-arrow-left"></i> {mode === "" ? "Back to Dashboard" : "Back"}
          </button>
          <h1>Billing Management</h1>
        </div>
        <p>Generate invoices and manage patient payments</p>
      </header>

      <main className="management-grid">
        {/* 🔥 MODE SELECTION */}
        {mode === "" && (
          <div className="mode-selection-container">
            <div className="card selection-card" onClick={() => setMode("create")}>
              <div className="card-icon"><i className="fa-solid fa-file-invoice-dollar"></i></div>
              <h2>Create New Bill</h2>
              <p>Generate a new invoice for a patient appointment.</p>
              <button className="card-button">Open Creator</button>
            </div>

            <div className="card selection-card" onClick={() => setMode("lookup")}>
              <div className="card-icon"><i className="fa-solid fa-receipt"></i></div>
              <h2>Retrieve Bill</h2>
              <p>Search and update existing billing records by Appointment ID.</p>
              <button className="card-button outline">Find Invoice</button>
            </div>
          </div>
        )}

        {/* ================= CREATE SECTION ================= */}
        {mode === "create" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2><i className="fa-solid fa-plus-circle"></i> Create Invoice</h2>
              <div className="registration-form">
                <div className="form-group">
                  <label>Appointment ID</label>
                  <input
                    type="number"
                    placeholder="Enter Appointment ID"
                    value={form.appointment_id}
                    onChange={(e) => setForm({ ...form, appointment_id: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Total Amount ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Initial Payment Mode (Optional)</label>
                  <select 
                    value={form.payment_mode} 
                    onChange={(e) => setForm({ ...form, payment_mode: e.target.value })}
                  >
                    <option value="">Select Mode</option>
                    <option value="CASH">CASH</option>
                    <option value="CARD">CARD</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
                <button className="card-button submit-btn" onClick={createBill}>
                  Generate Bill
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= LOOKUP SECTION ================= */}
        {mode === "lookup" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2><i className="fa-solid fa-magnifying-glass-dollar"></i> Invoice Lookup</h2>
              <div className="search-box">
                <input
                  placeholder="Enter Appointment ID"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
                <button className="card-button" onClick={getBill}>Search</button>
              </div>

              {bill && (
                <div className="bill-result-card">
                  <div className="result-header">
                    <span className="bill-id-tag">Bill #{bill.bill_id}</span>
                    <span className={`status-badge ${bill.payment_status?.toLowerCase()}`}>
                      {bill.payment_status}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span><strong>Appointment ID:</strong></span>
                    <span>{bill.appointment_id}</span>
                  </div>
                  <div className="detail-row">
                    <span><strong>Total Amount:</strong></span>
                    <span className="amount-text">Rs.{bill.amount}</span>
                  </div>
                  <div className="detail-row">
                    <span><strong>Current Mode:</strong></span>
                    <span>{bill.payment_mode || "Not Set"}</span>
                  </div>

                  <div className="update-payment-zone">
                    <h4>Update Payment Method</h4>
                    <div className="search-box">
                      <select 
                        value={updateMode} 
                        onChange={(e) => setUpdateMode(e.target.value)}
                      >
                        <option value="">Choose Method</option>
                        <option value="CASH">CASH</option>
                        <option value="CARD">CARD</option>
                        <option value="UPI">UPI</option>
                      </select>
                      <button className="card-button outline" onClick={updatePayment}>Update</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Billing;