import { isAxiosError } from "axios";
import { api } from "./api";

const createBlogService = async (values) => {
  try {
    const response = await api.post("/blog");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message;
    }
  }
};
