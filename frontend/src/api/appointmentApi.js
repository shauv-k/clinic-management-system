import axios from "axios";

const BASE = "http://localhost:8000";

export const bookAppointment = (data) =>
  axios.post(`${BASE}/appointments/`, data);

export const getDoctorAppointments = (id) =>
  axios.get(`${BASE}/appointments/by-doctor/${id}`);