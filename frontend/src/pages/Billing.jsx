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
import { useState } from "react";
import axios from "axios";
import "./Billing.css";

function Billing({ go }) {
  const [mode, setMode] = useState("");
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
      if (!form.appointment_id || !form.amount) {
        alert("⚠️ Appointment ID and Amount required");
        return;
      }

      const payload = {
        appointment_id: Number(form.appointment_id),
        amount: Number(form.amount),
        payment_mode: form.payment_mode || null
      };

      console.log("CREATE BILL:", payload);

      await axios.post("http://localhost:8000/billing", payload);

      alert("✅ Bill created successfully");

      setForm({
        appointment_id: "",
        amount: "",
        payment_mode: ""
      });

      setMode("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.detail || "❌ Error creating bill");
    }
  };

  // ================= GET BILL =================
  const getBill = async () => {
    try {
      if (!appointmentId) {
        alert("⚠️ Enter Appointment ID");
        return;
      }

      const res = await axios.get(
        `http://localhost:8000/billing/${appointmentId}`
      );

      setBill(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Bill not found");
      setBill(null);
    }
  };

  // ================= UPDATE PAYMENT =================
  const updatePayment = async () => {
    try {
      if (!updateMode) {
        alert("⚠️ Select payment mode");
        return;
      }

      await axios.patch(
        `http://localhost:8000/billing/${appointmentId}?mode=${updateMode}`
      );

      alert("✅ Payment updated");

      getBill(); // refresh
      setUpdateMode("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Update failed");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-top">
          <button
            className="back-btn"
            onClick={() =>
              mode === "" ? go("dashboard") : setMode("")
            }
          >
            ⬅ {mode === "" ? "Dashboard" : "Back"}
          </button>

          <h1>Billing Management</h1>
        </div>

        <p>Generate invoices and manage payments</p>
      </header>

      <main className="management-grid">

        {/* ================= MODE SELECT ================= */}
        {mode === "" && (
          <div className="mode-selection-container">

            <div
              className="card selection-card"
              onClick={() => setMode("create")}
            >
              <h2>Create Bill</h2>
              <p>Generate new bill</p>
              <button className="card-button">Open</button>
            </div>

            <div
              className="card selection-card"
              onClick={() => setMode("lookup")}
            >
              <h2>Lookup Bill</h2>
              <p>Search & update bill</p>
              <button className="card-button outline">Open</button>
            </div>

          </div>
        )}

        {/* ================= CREATE ================= */}
        {mode === "create" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2>Create Bill</h2>

              <input
                type="number"
                placeholder="Appointment ID"
                value={form.appointment_id}
                onChange={(e) =>
                  setForm({ ...form, appointment_id: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              <select
                value={form.payment_mode}
                onChange={(e) =>
                  setForm({ ...form, payment_mode: e.target.value })
                }
              >
                <option value="">Select Payment Mode</option>
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
                <option value="UPI">UPI</option>
              </select>

              <button className="card-button" onClick={createBill}>
                Create Bill
              </button>
            </div>
          </section>
        )}

        {/* ================= LOOKUP ================= */}
        {mode === "lookup" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2>Lookup Bill</h2>

              <input
                placeholder="Enter Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
              />

              <button className="card-button" onClick={getBill}>
                Search
              </button>

              {/* ================= RESULT ================= */}
              {bill && (
                <div className="bill-result-card">

                  {/* 🔥 STATUS LOGIC FIX */}
                  {(() => {
                    const status = bill.payment_mode ? "PAID" : "UNPAID";

                    return (
                      <div className="result-header">
                        <span>Bill #{bill.bill_id}</span>
                        <span className={`status-badge ${status.toLowerCase()}`}>
                          {status}
                        </span>
                      </div>
                    );
                  })()}

                  <p><b>Appointment ID:</b> {bill.appointment_id}</p>
                  <p><b>Amount:</b> ₹{bill.amount}</p>
                  <p><b>Payment Mode:</b> {bill.payment_mode || "Not Set"}</p>

                  {/* UPDATE */}
                  <h4>Update Payment</h4>

                  <select
                    value={updateMode}
                    onChange={(e) => setUpdateMode(e.target.value)}
                  >
                    <option value="">Select Mode</option>
                    <option value="CASH">CASH</option>
                    <option value="CARD">CARD</option>
                    <option value="UPI">UPI</option>
                  </select>

                  <button
                    className="card-button outline"
                    onClick={updatePayment}
                  >
                    Update
                  </button>

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
                  <label>Total Amount (Rs.)</label>
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