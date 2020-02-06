import callApi from "../util/callApi";
import config from "../config/env";
import delay from "../util/delay";

/**
 *
 * @return Promise<{accessToken, refreshToken}>
 */
export function signInApi({ username, password }) {
  return delay(500).then(() =>
    Promise.resolve({
      accessToken: "access hello",
      refreshToken: "refresh hello"
    })
  );
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
  return delay(500).then(() =>
    Promise.resolve({
      username: "myusername",
      age: 33
    })
  );
  return callApi({
    url: "cpuser/getByUserName",
    method: "POST",
    body: { username }
  });
}

/**
 *
 * @return Promise<{accessToken, refreshToken, userData}>
 */
export function signUpApi({ username, email, password }) {
  return delay(500).then(() =>
    Promise.resolve({
      accessToken: "access hello",
      refreshToken: "refresh hello",
      userData: { username, email }
    })
  );
  return callApi({
    url: "signUp",
    isAuth: true,
    method: "POST",
    body: {
      username,
      password,
      email
    }
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
