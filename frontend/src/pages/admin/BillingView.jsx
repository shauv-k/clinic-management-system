import { useEffect, useState } from "react";
import { getBilling } from "../../api/billingApi";

function BillingView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBilling().then((res) => setData(res.data.data));
  }, []);

  return (
    <div>
      <h2>Billing</h2>

      <ul>
        {data.map((b, i) => (
          <li key={i}>
            Bill ID: {b[0]} | Amount: {b[2]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BillingView;