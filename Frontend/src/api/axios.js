import axios from 'axios';

let apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Auto-correct URL if /api suffix is missing
if (apiBaseURL && !apiBaseURL.endsWith('/api') && !apiBaseURL.endsWith('/api/')) {
  apiBaseURL = apiBaseURL.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL: apiBaseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
