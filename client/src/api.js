import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

console.log('▶️ API baseURL =', API.defaults.baseURL);

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
