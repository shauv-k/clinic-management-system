import { useState } from "react";
import { login } from "../api/authApi";
import "../styles/form.css";

function Login({ setUser }) {
  const [data, setData] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    const res = await login(data);

    if (res.data.error) {
      alert("Invalid credentials");
      return;
    }

    setUser(res.data);
  };

  return (
    <div className="form-container">
      <h2>Clinic Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;