import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import PatientPage from "./pages/PatientPage";
import AppointmentPage from "./pages/AppointmentPage";
import Prescription from "./pages/Prescription";
import Billing from "./pages/Billing";

function App() {
  const [step, setStep] = useState("dashboard");

  if (step === "dashboard")
    return <Dashboard go={setStep} />;

  if (step === "patient")
    return <PatientPage go={setStep} />;

  if (step === "appointment")
    return <AppointmentPage go={setStep} />;
  
  if (step === "prescription")
    return <Prescription go={setStep} />;

  if (step === "billing") 
    return <Billing go={setStep} />;
}

export default App;