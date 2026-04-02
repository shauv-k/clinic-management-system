import axios from "axios";

const BASE = "http://127.0.0.1:8000";

export const bookAppointment = (data) =>
  axios.post(`${BASE}/appointments/`, data);

export const getDoctorAppointments = (id) =>
  axios.get(`${BASE}/appointments/doctor/${id}`);