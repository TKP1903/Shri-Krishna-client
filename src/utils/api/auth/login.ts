import axios from "axios";
import { LoginDetails } from "../../../types";
import { API_URL } from "../../../config";

export default async (loginDetails: LoginDetails) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, loginDetails);
  return data;
};
