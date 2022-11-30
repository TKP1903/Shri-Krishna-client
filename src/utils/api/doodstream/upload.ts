import axios from "axios";

import {
  API_URL as OUR_API,
  DOODSTREAM_API_KEY,
  DOODSTREAM_API_URL,
} from "../../../config";
import { CdnUploadRes } from "../../../types";

const getUploadUrl = (() => {
  let uploadUrl: string = "";
  setInterval(
    () => {
      uploadUrl = "";
    },
    // 2 min
    2 * 60 * 1000
  );

  return async (cancelToken: any) => {
    if (uploadUrl.length > 0) {
      return uploadUrl;
    }
    try {
      const response = await axios.get(`${OUR_API}/dood/uploadUrl`, {
        cancelToken,
      });
      if (response.data.status === 200) {
        uploadUrl = response.data.result;
        return uploadUrl;
      }
      return response.data?.result;
    } catch (err: any) {
      if (axios.isCancel(err)) {
        throw err;
      }
    }
  };
})();

// Admin or Employee only
export default async (
  file: File,
  cancelTokenSource: any,
  onUploadProgress: (progressEvent: any) => void
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", DOODSTREAM_API_KEY);
    // const {
    //   data: { result: uploadUrl },
    // } = await axios.get(
    //   `${DOODSTREAM_API_URL}/upload/server?key=${DOODSTREAM_API_KEY}`
    // );
    const uploadUrl = await getUploadUrl(cancelTokenSource.token);
    console.log({ uploadUrl });

    const { data } = await axios.post<CdnUploadRes>(
      `${uploadUrl}?${DOODSTREAM_API_KEY}`,
      formData,
      {
        onUploadProgress,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
        cancelToken: cancelTokenSource.token,
      }
    );

    if (data.status !== 200) {
      throw new Error(data.msg);
    }
    const result = data.result[0];
    if (result.status !== 200) {
      throw new Error("Upload failed");
    }
    if (result.canplay !== undefined) delete result.canplay;
    if (result.status !== undefined) delete result.status;
    return {
      ...result,
    };
  } catch (err: any) {
    if (axios.isCancel(err)) {
      throw err;
    }
    throw new Error(err.response?.data?.msg || err.message);
  }
};
