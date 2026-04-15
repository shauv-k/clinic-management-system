import React from "react";
import "./Dashboard.css";

const Dashboard = ({ go }) => {
  const handleNavigation = (destination) => {
    if (go) {
      go(destination);
    }
  };

  // 🔥 SVG ICONS (NO DEPENDENCY)
  const icons = {
    patients: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11v-1a4 4 0 0 0-4-4" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
      </svg>
    ),
    appointment: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    medical: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 2h6v4H9z" />
        <path d="M4 6h16v16H4z" />
        <path d="M12 10v6M9 13h6" />
      </svg>
    ),
    prescription: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h10v6H4z" />
        <path d="M14 10l6 6" />
        <path d="M10 14l6 6" />
      </svg>
    ),
    billing: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    )
  };

  const menuItems = [
    {
      title: "Patients",
      route: "patient",
      description: "Manage patient information and profiles.",
      icon: icons.patients,
      buttonText: "View Patients",
    },
    {
      title: "Appointments",
      route: "appointment",
      description: "Schedule and manage appointments.",
      icon: icons.appointment,
      buttonText: "View Appointments",
    },
    {
      title: "Medical Records",
      route: "medical",
      description: "Access patient medical history.",
      icon: icons.medical,
      buttonText: "View Records",
    },
    {
      title: "Prescription",
      route: "prescription",
      description: "Manage prescriptions and medicines.",
      icon: icons.prescription,
      buttonText: "View Prescriptions",
    },
    {
      title: "Billing",
      route: "billing",
      description: "Handle billing and payments.",
      icon: icons.billing,
      buttonText: "View Billing",
    },
  ];

  return (
    <div className="dashboard-container">

      <header className="app-header">
        <div className="header-left"></div>
        <div className="header-center">
          <h1 className="app-title">Clinic Management System</h1>
        </div>
        <div className="header-right"></div>
      </header>

      <main className="dashboard-grid">
        {menuItems.map((item, index) => (
          <div className="dashboard-card" key={index}>

            <div className="card-content">
              <div className="card-icon">
                {item.icon}
              </div>

              <h2 className="card-title">{item.title}</h2>
              <p className="card-description">{item.description}</p>
            </div>

            <button
              className="primary-btn"
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