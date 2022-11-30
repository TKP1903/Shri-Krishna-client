import axios from "axios";

// import { RefreshTokensResponse } from "../../../types";
import { API_URL } from "../../../config";
import { LoginResponse } from "../../../types";
import { debounce } from "../../js";

type RefreshToken = LoginResponse["tokens"]["refresh"];

async function logout(
  refreshToken: string,
  cancelTokenSource: any
): Promise<boolean> {
  try {
    const response = await axios.post<RefreshToken>(
      `${API_URL}/auth/logout`,
      {
        refreshToken,
      },
      {
        cancelToken: cancelTokenSource.token,
      }
    );
    return true;
  } catch (error: any) {
    throw new Error(error.response.data.message);
    return false;
  }
}

export default debounce(logout, 1000);
