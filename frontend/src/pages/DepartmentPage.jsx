import { useEffect, useState } from "react";
import axios from "axios";

function DepartmentPage({ setDepartment, go }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/departments/")
      .then(res => {
        console.log("Departments:", res.data);
        setDepartments(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Department</h2>

      {departments.length === 0 && <p>No departments found</p>}

      {departments.map(dep => (
        <div key={dep.department_id} style={{ marginBottom: "10px" }}>
          <p><b>{dep.name}</b></p>

          <button onClick={() => {
            setDepartment(dep);
            go("doctor");
          }}>
            Select
          </button>
        </div>
      ))}
    </div>
  );
}

export default DepartmentPage;