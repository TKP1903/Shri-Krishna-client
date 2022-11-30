import axios from "axios";

import { API_URL } from "../../../config";

import { debounce } from "../../js";

async function isLogged(
  userId: string,
  accessToken: string,
  cancelTokenSource: any
): Promise<boolean> {
  try {
    const response = await axios.get(`${API_URL}/misc/checkLogin/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: cancelTokenSource.token,
    });
    // if status 204 then user is logged in
    return response.status === 204; // no content
  } catch (error: any) {
    try {
      throw new Error(error.response.data.message);
    } catch (ee) {
      return false;
    }
  }
}

export default debounce<Promise<boolean>>(isLogged, 500);
