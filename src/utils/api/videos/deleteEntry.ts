import axios from "axios";
import { API_URL } from "../../../config";

import { debounce } from "../../js";

const deleteEntry = async (
  videoId: string,
  accessToken: string,
  cancelTokenSource: any
) => {
  try {
    return await axios.delete(`${API_URL}/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: cancelTokenSource?.token || null,
    });
  } catch (err: any) {
    throw new Error(err?.message || "Unknown error");
  }
};

export default debounce(deleteEntry, 1000);
