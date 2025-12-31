import axios from "axios";
import { useAuthStore } from "../store/authStore.js";

export const api = axios.create({
  baseURL: "http://192.168.0.100:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});




api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
