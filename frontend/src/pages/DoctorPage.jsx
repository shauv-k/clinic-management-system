import { useEffect, useState } from "react";
import axios from "axios";

function DoctorPage({ specialization, setDoctor, go }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (!specialization) return;

    axios.get(
      `http://localhost:8000/doctors/by-department-name/${specialization}`
    )
    .then(res => {
      console.log("Doctors:", res.data);

      if (Array.isArray(res.data)) {
        setDoctors(res.data);
      } else {
        setDoctors([]);
      }
    })
    .catch(() => setDoctors([]));

  }, [specialization]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctors - {specialization}</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        {Array.isArray(doctors) && doctors.map((doc, index) => (
          <div
            key={doc.doctor_id || index}   // ✅ FIX KEY WARNING
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              width: "250px"
            }}
          >
            <h3>{doc.name}</h3>

            {/* ✅ FIXED FIELD NAME */}
            <p><b>ID:</b> {doc.doctor_id}</p>

            <p><b>Specialization:</b> {doc.specialization}</p>

            {/* ✅ SAFE CHECK */}
            {doc.qualifications && (
              <p><b>Qualification:</b> {doc.qualifications}</p>
            )}

            <button
              onClick={() => {
                setDoctor(doc);
                go("book");
              }}
            >
              Select Doctor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorPage;