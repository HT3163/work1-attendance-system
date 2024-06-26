import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  baseURL: 'https://work1-attendance-backend.vercel.app/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default API;
