import { postUserLogout } from "../action/authAction";
import { AUTH_TYPE } from "../reducer/authReducer";
import { store } from "../store";
import config from "./config";
import axios from "axios";

export const api = async (data, callBackProgress) => {
  console.log(data);

  let url = data.url;
  let baseURL = config.BASE_API_URL;
  let state = store.getState();
  let token = state.authReducer?.token;

  // Định nghĩa requestParams bên ngoài khối try-catch
  let requestParams = {
    baseURL,
    method: data.method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(data.method === "get"
      ? { params: data.params }
      : { data: data.params }),
  };

  console.log(requestParams);

  try {
    // Gọi API
    const response = await axios(requestParams);
    return response;
  } catch (error) {
    console.error("API Error:", error);

    if (
      error.response &&
      error.response.status === 422 &&
      error.response.data.error.authorization.msg === "jwt expired"
    ) {
      const refreshToken = store.getState().authReducer?.refreshToken;

      try {
        // Gọi API để làm mới token
        console.log(refreshToken);

        const refreshResponse = await axios.post(
          `http://localhost:3000/user/refresh-token`,
          {
            refresh_token: refreshToken,
          }
        );
        console.log(refreshResponse);

        const newToken = refreshResponse.data;
        // Lưu token mới vào store
        store.dispatch({ type: "UPDATE_TOKEN", payload: newToken });

        // Cập nhật lại token mới trong requestParams và retry
        requestParams.headers[
          "Authorization"
        ] = `Bearer ${newToken.access_token}`;
        const retryResponse = await axios(requestParams);
        return retryResponse;
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        if (refreshError.response.status == 401) {
          console.log("ádffsdfd");
          
          store.dispatch({type: AUTH_TYPE.LOGOUT_SUCCESS});
        }
        throw refreshError;
      }
    }
  }
};
