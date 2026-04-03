import { useEffect, useState } from "react";
import axios from "axios";

function DepartmentDoctors({ setDoctor, go }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/doctors")
      .then(res => setDoctors(res.data));
  }, []);

  return (
    <div>
      <h2>Select Doctor</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>
                <button onClick={() => {
                  setDoctor(d);
                  go("doctor");
                }}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentDoctors;