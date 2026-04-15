// src/components/BillingTable.jsx
import { useEffect, useState } from "react";
import { getBilling } from "../api/billingApi";

function BillingTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getBilling();
    setData(res.data.data);
  };

  return (
    <div>
      <h3>Billing Records</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[2]}</td>
              <td>{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillingTable;