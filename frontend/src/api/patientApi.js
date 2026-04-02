import axios from "axios";

const BASE = "http://127.0.0.1:8000";

// Get all patients
export const getPatients = () =>
  axios.get(`${BASE}/patients/`);

// Create patient
export const createPatient = (data) =>
  axios.post(`${BASE}/patients/`, data);

// Delete patient (optional)
export const deletePatient = (id) =>
  axios.delete(`${BASE}/patients/${id}`);