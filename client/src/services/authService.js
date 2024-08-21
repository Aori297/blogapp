import { isAxiosError } from "axios";
import { api } from "./api";

export const registerUserService = async (values) => {
  try {
    const response = await api.post("/auth/register", values);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message;
    }
  }
};

export const loginUserService = async (values) => {
  try {
    const response = await api.post("/auth/login", values);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message;
    }
  }
};
