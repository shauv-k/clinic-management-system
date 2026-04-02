import axios from "axios";

const BASE = "http://127.0.0.1:8000";

export const getDoctors = () => axios.get(`${BASE}/doctors`);