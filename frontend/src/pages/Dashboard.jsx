import React from 'react';
import './Dashboard.css';

const Dashboard = ({ go }) => {
  const handleNavigation = (destination) => {
    // Assuming 'go' is a function passed as a prop for navigation
    if (go) {
      go(destination);
    } else {
      console.log(`Navigating to: ${destination}`);
    }
  };

  const menuItems = [
  {
    title: "Patients",
    route: "patient", // ✅ FIX
    description: "Manage patient information and profiles.",
    icon: "fas fa-users",
    buttonText: "View Patients"
  },
  {
    title: "Appointments",
    route: "appointment", // ✅ FIX
    description: "Schedule and view upcoming appointments.",
    icon: "fas fa-calendar-alt",
    buttonText: "View Appointments"
  },
  {
    title: "Medical",
    route: "medical", // ✅ FIX (based on your App.jsx)
    description: "Access and update patient medical histories.",
    icon: "fas fa-file-medical",
    buttonText: "View Records"
  },
  {
    title: "Prescription",
    route: "prescription", // ✅ FIX
    description: "Generate and manage patient prescriptions.",
    icon: "fas fa-prescription-bottle-alt",
    buttonText: "View Prescriptions"
  },
  {
    title: "Billing",
    route: "billing", // ✅ FIX
    description: "Handle patient billing and financial records.",
    icon: "fas fa-dollar-sign",
    buttonText: "View Billing"
  }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Clinic Management System</h1>
      </header>

      <main className="dashboard-grid">
        {menuItems.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-icon">
              <i className={item.icon}></i>
            </div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button 
              className="card-button" 
              onClick={() => handleNavigation(item.route)}
            >
              {item.buttonText}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;