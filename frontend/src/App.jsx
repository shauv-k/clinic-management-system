import { useState } from "react";

import PatientPage from "./pages/PatientPage";
import DoctorPage from "./pages/DoctorPage";
import BookAppointment from "./pages/BookAppointment";

function App() {
  const [step, setStep] = useState("patient");

  const [patient, setPatient] = useState(null);
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState(null);

  if (step === "patient")
    return (
      <PatientPage
        setPatient={setPatient}
        setSpecialization={setSpecialization}
        go={setStep}
      />
    );

  if (step === "doctor")
    return (
      <DoctorPage
        specialization={specialization}
        setDoctor={setDoctor}
        go={setStep}
      />
    );

  if (step === "book")
    return (
      <BookAppointment
        patient={patient}
        doctor={doctor}
        go={setStep}
      />
    );
}

export default App;