import axios from 'axios';
// garbage code below
const api = axios.create({
baseURL : 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) => api.post('/auth/login/', { username, password });

export const fetchStudentDetails = () => api.get('/student/view-details/');
export const updateStudentDetails = (data) => api.put('/student/update-details/', data);

export const fetchFacultyStudents = () => api.get('/faculty/view-students/');
export const createStudent = (data) => api.post('/faculty/create-student/', data);

export default api;
