// src/service/index.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // NestJS backend manzili
});

// har bir so‘rovda tokenni yuborish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
