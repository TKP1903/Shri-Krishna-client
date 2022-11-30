import axios from "axios";

// import { RefreshTokensResponse } from "../../../types";
import { API_URL } from "../../../config";
import { LoginResponse } from "../../../types";
import { debounce } from "../../js";

type RefreshTokens = LoginResponse["tokens"];

async function refreshTokens(
  refreshToken: string,
  cancelTokenSource: any
): Promise<RefreshTokens | null> {
  try {
    // debugger;
    const response = await axios.post<RefreshTokens>(
      `${API_URL}/auth/refresh-tokens`,
      {
        refreshToken,
      },
      {
        cancelToken: cancelTokenSource.token,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
    return null;
  }
}

export default debounce<Promise<RefreshTokens | null>>(refreshTokens, 1000);
