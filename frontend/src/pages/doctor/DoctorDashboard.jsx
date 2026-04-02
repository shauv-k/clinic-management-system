import AppointmentList from "./AppointmentList";
import "../../styles/dashboard.css";

function DoctorDashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Doctor Dashboard</h1>
      <AppointmentList doctorId={user.linked_id} />
    </div>
  );
}

export default DoctorDashboard;