import { useEffect, useState } from "react";
import { getDoctorAppointments } from "../../api/appointmentApi";

function AppointmentList({ doctorId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDoctorAppointments(doctorId).then((res) =>
      setData(res.data.data)
    );
  }, [doctorId]);

  return (
    <table>
      <thead>
        <tr>
          <th>Patient</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((a, i) => (
          <tr key={i}>
            <td>{a[0]}</td>
            <td>{a[1]}</td>
            <td>{a[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AppointmentList;