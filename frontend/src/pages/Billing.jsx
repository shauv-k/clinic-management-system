import { useState } from "react";
import axios from "axios";
import "./Billing.css";

function Billing({ go }) {
  const [mode, setMode] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [bill, setBill] = useState(null);
  const [updateMode, setUpdateMode] = useState("");
  const [banner, setBanner] = useState(null);

  const [form, setForm] = useState({
    appointment_id: "",
    amount: "",
    payment_mode: ""
  });

  // ================= CREATE =================
  const createBill = async () => {
    try {
      if (!form.appointment_id || !form.amount) {
        setBanner({ type: "error", text: "Appointment ID and Amount required" });
        return;
      }

      await axios.post("http://localhost:8000/billing", {
        appointment_id: Number(form.appointment_id),
        amount: Number(form.amount),
        payment_mode: form.payment_mode || null
      });

      setBanner({ type: "success", text: "Bill created successfully" });

      setForm({
        appointment_id: "",
        amount: "",
        payment_mode: ""
      });

      setMode("");
    } catch (err) {
      setBanner({
        type: "error",
        text: err.response?.data?.detail || "Error creating bill"
      });
    }
  };

  // ================= GET =================
  const getBill = async () => {
    try {
      if (!appointmentId) {
        setBanner({ type: "error", text: "Enter Appointment ID" });
        return;
      }

      const res = await axios.get(
        `http://localhost:8000/billing/${appointmentId}`
      );

      setBill(res.data);
    } catch {
      setBill(null);
      setBanner({ type: "error", text: "Bill not found" });
    }
  };

  // ================= UPDATE =================
  const updatePayment = async () => {
    try {
      if (!updateMode) {
        setBanner({ type: "error", text: "Select payment mode" });
        return;
      }

      await axios.patch(
        `http://localhost:8000/billing/${appointmentId}?mode=${updateMode}`
      );

      setBanner({ type: "success", text: "Payment updated" });

      getBill();
      setUpdateMode("");
    } catch {
      setBanner({ type: "error", text: "Update failed" });
    }
  };

  const getStatus = () => {
    if (!bill) return "";
    return bill.payment_mode ? "PAID" : "UNPAID";
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="app-header">

        <div className="header-left">
          <button
            className="back-btn"
            onClick={() => (mode === "" ? go("dashboard") : setMode(""))}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="header-center">
          <h1 className="app-title">Billing Management</h1>
        </div>

        <div className="header-right"></div>

      </header>

      <main className="management-grid">

        {/* ================= MENU ================= */}
        {mode === "" && (
          <div className="dashboard-grid">

            <div className="dashboard-card">
              <div className="card-content">

                <div className="card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>

                <h2 className="card-title">Create Bill</h2>
                <p className="card-description">Generate invoice</p>

              </div>

              <button className="primary-btn" onClick={() => setMode("create")}>
                Open
              </button>
            </div>

            <div className="dashboard-card">
              <div className="card-content">

                <div className="card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>

                <h2 className="card-title">Lookup Bill</h2>
                <p className="card-description">View payment details</p>

              </div>

              <button className="primary-btn" onClick={() => setMode("lookup")}>
                Open
              </button>
            </div>

          </div>
        )}

        {/* ================= CREATE ================= */}
        {mode === "create" && (
          <div className="single-column">
            <div className="card">

              <h2>Create Bill</h2>

              <div className="form-group">
                <input
                  className="input-field"
                  placeholder="Appointment ID"
                  value={form.appointment_id}
                  onChange={(e) =>
                    setForm({ ...form, appointment_id: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <input
                  className="input-field"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <select
                  className="input-field"
                  value={form.payment_mode}
                  onChange={(e) =>
                    setForm({ ...form, payment_mode: e.target.value })
                  }
                >
                  <option value="">Select Mode</option>
                  <option value="CASH">CASH</option>
                  <option value="CARD">CARD</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <button className="primary-btn full-width" onClick={createBill}>
                Create Bill
              </button>

            </div>
          </div>
        )}

        {/* ================= LOOKUP ================= */}
        {mode === "lookup" && (
          <div className="single-column">
            <div className="card">

              <h2>Lookup Bill</h2>

              <div className="search-box">
                <input
                  className="input-field"
                  placeholder="Appointment ID"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
                <button className="primary-btn" onClick={getBill}>
                  Search
                </button>
              </div>

              {bill && (
                <div className="result-card">

                  <div className="bill-header">
                    <span>Bill #{bill.bill_id}</span>
                    <span className={`status ${getStatus().toLowerCase()}`}>
                      {getStatus()}
                    </span>
                  </div>

                  <div className="detail-row">
                    <b>Amount:</b> ₹{bill.amount}
                  </div>

                  <div className="detail-row">
                    <b>Payment Mode:</b> {bill.payment_mode || "Not Set"}
                  </div>

                  <div className="update-zone">

                    <h4>Update Payment</h4>

                    <div className="search-box">
                      <select
                        className="input-field"
                        value={updateMode}
                        onChange={(e) => setUpdateMode(e.target.value)}
                      >
                        <option value="">Select Mode</option>
                        <option value="CASH">CASH</option>
                        <option value="CARD">CARD</option>
                        <option value="UPI">UPI</option>
                      </select>

                      <button className="primary-btn small-btn" onClick={updatePayment}>
                        Update
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* ✅ BANNER */}
      {banner && (
        <div className={`banner ${banner.type}`}>
          <span>{banner.text}</span>
          <button onClick={() => setBanner(null)}>✕</button>
        </div>
      )}

    </div>
  );
}

export default Billing;