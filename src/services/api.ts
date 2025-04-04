// services/api.ts
import axios from "axios";

export const adminApi = axios.create({
  baseURL: "http://localhost:3000/api-report/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const adminApiform = axios.create({
  baseURL: "http://localhost:3000/api-contact",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});