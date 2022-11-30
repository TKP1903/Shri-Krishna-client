import axios from "axios";
import { API_URL } from "../../../config";

import { debounce } from "../../js";

type RecentUploads = any;

const getRecentUploads = async (
  accessToken: string,
  CancelTokenSource: any
) => {
  try {
    const response = await axios.get(`${API_URL}/videos/recent-uploads`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: CancelTokenSource.token,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Unknown error");
  }
};

export default debounce<Promise<RecentUploads | null>>(getRecentUploads, 1000);
