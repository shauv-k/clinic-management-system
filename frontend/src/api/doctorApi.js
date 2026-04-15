export const getDoctorsByDepartment = (id) =>
  axios.get(`${BASE}/doctors/by-department/${id}`);