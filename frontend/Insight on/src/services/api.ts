import axios from "axios";

/**
 * Centralized Axios instance
 */
const api = axios.create({
  baseURL: "http://localhost:5000", // backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;