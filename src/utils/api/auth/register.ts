import axios from "axios";
import { RegisterDetails } from "../../../types";
import { API_URL } from "../../../config";

export default async function register(details: RegisterDetails) {
//   
  try {
    const response = await axios.post(`${API_URL}/auth/register`, details);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
}
