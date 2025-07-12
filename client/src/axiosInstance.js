import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://adidata.onrender.com/api/v1/', // ✅ use deployed URL
  // baseURL: 'http://localhost:5000/api/v1/', // ✅ use deployed URL

});

// Set token from localStorage if available (runs once on import)
const token = localStorage.getItem("token");
if (token) {
  instance.defaults.headers.common['Authorization'] = token;
}

export default instance;
