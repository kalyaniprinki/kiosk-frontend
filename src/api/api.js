// src/api/api.js
import axios from "axios";

// Use deployed backend URL directly
const API_URL = "https://project-yjqr.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: globally handle responses / errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Backend returned an error response
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("API Network / Unknown Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
