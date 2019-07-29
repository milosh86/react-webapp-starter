import callApi from "../util/callApi";
import config from "../config/env";

/**
 *
 * @return Promise<{{accessToken, refreshToken}>
 */
export function signInApi({ username, password }) {
  return callApi({
    url: "login",
    isAuth: true,
    method: "POST",
    body: {
      username: username,
      password: password,
      clientVersion: config.version,
      application: config.appName
    }
  });
}

/**
 * @param username
 */
export function getUserDataApi(username) {
  return callApi({
    url: "cpuser/getByUserName",
    method: "POST",
    body: { username }
  });
}

/**
 * Refresh token should be set in Authorization header.
 *
 * @param refreshToken
 * @return Promise<void>
 */
export function revokeRefreshTokenApi(refreshToken) {
  return callApi({
    url: "refreshToken/revoke",
    isAuth: true,
    method: "GET",
    externalToken: refreshToken
  });
}

/**
 * Get new access token.
 *
 * Refresh token should be set in Authorization header.
 *
 * @param refreshToken
 * @return Promise<{{accessToken}>
 */
export function refreshAccessTokenApi(refreshToken) {
  return callApi({
    url: "refreshToken/getAccessToken",
    isAuth: true,
    method: "GET",
    externalToken: refreshToken
  });
}
