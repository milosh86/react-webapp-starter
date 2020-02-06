import delay from "../../util/delay";
import callApi from "../../util/callApi";

/**
 *
 * @return Promise<{accessToken, refreshToken, userData}>
 */
export function resetPasswordApi({ email }) {
  return delay(500).then(() => Promise.resolve());
  return callApi({
    url: "resetPassword",
    isAuth: true,
    method: "POST",
    body: {
      email
    }
  });
}
