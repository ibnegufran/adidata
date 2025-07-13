// src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://adidata.onrender.com/api/v1/', // Use your deployed URL when pushing to production
  // baseURL: 'http://localhost:5000/api/v1/', // Your local development URL
  headers: {
    'Content-Type': 'application/json', // Ensure content type is set
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token with 'Bearer ' prefix to every outgoing request
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;