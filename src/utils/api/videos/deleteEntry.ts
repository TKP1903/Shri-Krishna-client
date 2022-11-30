import axios from "axios";
import { API_URL } from "../../../config";

import { debounce } from "../../js";

const deleteEntry = (
  accessToken: string,
  videoId: string,
  cancelTokenSource: any
) => {
  try {
    return axios.delete(`${API_URL}/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: cancelTokenSource.token,
    });
  } catch (err: any) {
    throw new Error(err?.message || "Unknown error");
  }
};

export default debounce(deleteEntry, 1000);
