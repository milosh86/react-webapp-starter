import delay from "../../util/delay";
import callApi from "../../util/callApi";

/**
 *
 * @return Promise<{accessToken, refreshToken, userData}>
 */
export function confirmNewPasswordApi({ password, token }) {
  return delay(500).then(() => Promise.resolve());
  return callApi({
    url: "confirmNewPasswordApi",
    isAuth: true,
    method: "POST",
    body: {
      password, token
    }
  });
}
