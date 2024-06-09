// src/axiosInstance.js
import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/features/auth/authSlice";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("token",token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    if (status === 401) {
      alert(data?.detail)
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
