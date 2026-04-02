import ManagePatients from "./ManagePatients";
import ManageDoctors from "./ManageDoctors";
import BillingView from "./BillingView";
import "../../styles/dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <ManagePatients />
      <ManageDoctors />
      <BillingView />
    </div>
  );
}

export default AdminDashboard;