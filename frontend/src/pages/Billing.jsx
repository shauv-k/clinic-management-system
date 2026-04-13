import { useState } from "react";
import axios from "axios";

function Billing({ go }) {
  const [mode, setMode] = useState("");

  const [appointmentId, setAppointmentId] = useState("");
  const [bill, setBill] = useState(null);

  const [form, setForm] = useState({
    appointment_id: "",
    amount: "",
    payment_mode: ""
  });

  const [updateMode, setUpdateMode] = useState("");

  // ================= CREATE BILL =================
  const createBill = async () => {
    try {
      const payload = {
        appointment_id: Number(form.appointment_id),
        amount: Number(form.amount),
        payment_mode: form.payment_mode || null // ✅ NULL allowed
      };

      console.log("CREATE BILL:", payload);

      await axios.post("http://localhost:8000/billing", payload);

      alert("✅ Bill created");

      setForm({
        appointment_id: "",
        amount: "",
        payment_mode: ""
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Error creating bill");
    }
  };

  // ================= GET BILL =================
  const getBill = async () => {
    try {
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
      await axios.patch(
        `http://localhost:8000/billing/${appointmentId}?mode=${updateMode || ""}`
      );

      alert("✅ Payment updated");

      // refresh bill
      getBill();

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => go("dashboard")}>⬅ Back</button>

      <h2>Billing</h2>

      {/* ================= OPTIONS ================= */}
      {mode === "" && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setMode("create")}>
            Create Bill
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setMode("lookup")}
          >
            Get Bill
          </button>
        </div>
      )}

      {/* ================= CREATE ================= */}
      {mode === "create" && (
        <div style={{ marginTop: "20px" }}>
          <h3>➕ Create Bill</h3>

          <input
            placeholder="Appointment ID"
            value={form.appointment_id}
            onChange={(e) =>
              setForm({ ...form, appointment_id: e.target.value })
            }
          />

          <br />

          <input
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <br />

          <input
            placeholder="Payment Mode (optional)"
            value={form.payment_mode}
            onChange={(e) =>
              setForm({ ...form, payment_mode: e.target.value })
            }
          />

          <br /><br />

          <button onClick={createBill}>Submit</button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setMode("")}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* ================= LOOKUP ================= */}
      {mode === "lookup" && (
        <div style={{ marginTop: "20px" }}>
          <h3>🔍 Get Bill</h3>

          <input
            placeholder="Enter Appointment ID"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
          />

          <button onClick={getBill}>Search</button>

          {/* RESULT */}
          {bill && (
            <div style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px"
            }}>
              <p><b>Bill ID:</b> {bill.bill_id}</p>
              <p><b>Appointment ID:</b> {bill.appointment_id}</p>
              <p><b>Amount:</b> {bill.amount}</p>
              <p><b>Payment Mode:</b> {bill.payment_mode || "UNPAID"}</p>
              <p><b>Status:</b> {bill.payment_status}</p>

              <hr />

              <h4>Update Payment Mode</h4>

              <input
                placeholder="CASH / CARD / UPI"
                value={updateMode}
                onChange={(e) => setUpdateMode(e.target.value)}
              />

              <br /><br />

              <button onClick={updatePayment}>
                Update Payment
              </button>
            </div>
          )}

          <br />

          <button onClick={() => setMode("")}>
            ⬅ Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Billing;