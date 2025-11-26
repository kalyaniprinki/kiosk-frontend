import axios from "axios";

// export const API_URL = "http://localhost:5000/api";
export const API_URL = "https://kiosk-frontend-amber.vercel.app";

const api = axios.create({
  baseURL: API_URL,
});
// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
