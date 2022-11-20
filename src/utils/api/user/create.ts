import axios from "axios";
import { User } from "../../../types";

export default async function create(user: User) {
  const response = await axios.post("http://localhost:3000/users/", user);
  return response.data;
}
