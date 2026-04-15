import { useState } from "react";
import AppointmentCreate from "./AppointmentCreate";
import AppointmentLookup from "./AppointmentLookup";
import AppointmentUpdate from "./AppointmentUpdate";

function Appointment({ go }) {
  const [mode, setMode] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => go("dashboard")}>⬅ Back</button>

      <h2>Appointment Management</h2>

      {mode === "" && (
        <div>
          <button onClick={() => setMode("create")}>Create</button>
          <button onClick={() => setMode("lookup")}>Lookup</button>
          <button onClick={() => setMode("update")}>Update Status</button>
        </div>
      )}

      {mode === "create" && <AppointmentCreate goBack={() => setMode("")} />}
      {mode === "lookup" && <AppointmentLookup goBack={() => setMode("")} />}
      {mode === "update" && <AppointmentUpdate goBack={() => setMode("")} />}
    </div>
  );
}

export default Appointment;