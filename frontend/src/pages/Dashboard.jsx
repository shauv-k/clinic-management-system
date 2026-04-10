function Dashboard({ go }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Clinic Management System</h1>

      <div style={{ marginTop: "40px" }}>
        <button
          style={{ margin: "10px", padding: "15px" }}
          onClick={() => go("patient")}
        >
          Patient
        </button>

        <button
          style={{ margin: "10px", padding: "15px" }}
          onClick={() => go("appointment")}
        >
          Appointment
        </button>
      </div>
    </div>
  );
}

export default Dashboard;