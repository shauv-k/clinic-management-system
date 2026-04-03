function Dashboard({ go }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Clinic Staff Dashboard</h1>

      <button onClick={() => go("patient")}>
        Start Appointment Process
      </button>
    </div>
  );
}

export default Dashboard;