import axios from "axios";

import { API_URL } from "../../../config";
import { debounce } from "../../js";
import { CourseData } from "../../../types";

// Admin or Employee only
export default async (token: string, course: any) => {
  try {
    const response = await axios.post<
      Omit<CourseData, "createdAt" | "updatedAt" | "students">
    >(`${API_URL}/courses`, course, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
