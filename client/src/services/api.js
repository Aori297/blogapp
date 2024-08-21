import axios from "axios";

const token = localStorage.getItem("access-token")
  ? localStorage.getItem("access-token")
  : undefined;

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: "Bearer ${token}",
  },
});
