// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Clinic System</h2>
      <Link to="/">Dashboard</Link> | 
      <Link to="/patients">Patients</Link> | 
      <Link to="/appointments">Appointments</Link> | 
      <Link to="/billing">Billing</Link>
    </nav>
  );
}

export default Navbar;