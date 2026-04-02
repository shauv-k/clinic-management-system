import axios from "axios";

const BASE = "http://127.0.0.1:8000";

export const login = (data) => axios.post(`${BASE}/login`, data);