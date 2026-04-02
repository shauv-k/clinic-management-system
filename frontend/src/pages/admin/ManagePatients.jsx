import { useEffect, useState } from "react";
import { getPatients } from "../../api/patientApi";
import "../../styles/table.css";

function ManagePatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients().then((res) => setPatients(res.data));
  }, []);

  return (
    <div>
      <h2>Patients</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.patient_id}>
              <td>{p.patient_id}</td>
              <td>{p.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagePatients;