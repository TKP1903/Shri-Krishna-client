import axios from "axios";
import { debounce } from "../../js";
import { API_URL } from "../../../config";
import { CourseData } from "../../../types";

export default async (token: string, id: string) => {
  try {
    const response = await axios.get<CourseData>(`${API_URL}/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
