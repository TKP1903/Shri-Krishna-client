import axios from "axios";
import { API_URL } from "../../../config";

import { VideoEntry, SavedVideo } from "../../../types";

const newVideoEntry = async (
  data: VideoEntry,
  token: string,
  cancelTokenSource: any
) => {
  // debugger;
  try {
    const response = await axios.post<SavedVideo>(`${API_URL}/videos`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: cancelTokenSource.token,
    });
    return response.data;
  } catch (err: any) {
    if (axios.isCancel(err)) {
      throw err;
    }
    if (err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
};

export default newVideoEntry;
