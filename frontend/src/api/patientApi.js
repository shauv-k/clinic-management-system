import axios from "axios";

const BASE = "http://localhost:8000";

// Get all patients
export const getPatients = () =>
  axios.get(`${BASE}/patients/`);

// Create patient
export const createPatient = (data) =>
  axios.post(`${BASE}/patients/`, data);

// 🔥 NEW: Get by phone
export const getPatientByPhone = (phone) =>
  axios.get(`${BASE}/patients/by-phone/${phone}`);

// 🔥 NEW: Get by ID
export const getPatientById = (id) =>
  axios.get(`${BASE}/patients/by-id/${id}`);