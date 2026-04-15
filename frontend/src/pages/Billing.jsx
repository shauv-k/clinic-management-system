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

      getBill();
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

        {/* MODE SELECT */}
        {mode === "" && (
          <div className="mode-selection-container">
            <div
              className="card selection-card"
              onClick={() => setMode("create")}
            >
              <h2>Create Bill</h2>
              <button className="card-button">Open</button>
            </div>

            <div
              className="card selection-card"
              onClick={() => setMode("lookup")}
            >
              <h2>Lookup Bill</h2>
              <button className="card-button outline">Open</button>
            </div>
          </div>
        )}

        {/* CREATE */}
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
                <option value="">Select Mode</option>
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
                <option value="UPI">UPI</option>
              </select>

              <button onClick={createBill}>Create Bill</button>
            </div>
          </section>
        )}

        {/* LOOKUP */}
        {mode === "lookup" && (
          <section className="management-section centered-section">
            <div className="card">
              <h2>Lookup Bill</h2>

              <input
                placeholder="Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
              />

              <button onClick={getBill}>Search</button>

              {bill && (
                <div>
                  <p>Bill ID: {bill.bill_id}</p>
                  <p>Amount: ₹{bill.amount}</p>
                  <p>Mode: {bill.payment_mode || "Not Set"}</p>

                  <select
                    value={updateMode}
                    onChange={(e) => setUpdateMode(e.target.value)}
                  >
                    <option value="">Select Mode</option>
                    <option value="CASH">CASH</option>
                    <option value="CARD">CARD</option>
                    <option value="UPI">UPI</option>
                  </select>

                  <button onClick={updatePayment}>Update</button>
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