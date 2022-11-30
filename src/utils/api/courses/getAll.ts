import axios from "axios";
import { debounce } from "../../js";
import { API_URL } from "../../../config";

import { CourseData } from "../../../types";

// Admin only
const getCourses = async (token: string) => {
  try {
    const response = await axios.get<CourseData[]>(`${API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default debounce(getCourses, 1000);
