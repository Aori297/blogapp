import axios from "axious";

const token = localStorage.getItem("access-token")
  ? localStorage.getItem(access - token)
  : undefined;

export const api = axios.create({
  baseURL: "",
  headers: {
    Authorization: "Bearer ${token}",
  },
});
