// src/api/api.js
import axios from "axios";

// Use environment variable for API base URL
// Create .env.development and .env.production in your frontend folder
// Example:
//   .env.development -> REACT_APP_API_URL=http://localhost:5000/api
//   .env.production  -> REACT_APP_API_URL=https://kiosk-backend.vercel.app/api
const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  console.error(
    "REACT_APP_API_URL is not defined! Please set it in your .env file."
  );
}

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
