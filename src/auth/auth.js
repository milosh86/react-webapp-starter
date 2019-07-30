import callApi from "../util/callApi";
import {
  clearAllFromCache,
  storeAccessTokenInCache,
  storeRefreshTokenInCache,
  storeUserDataInCache
} from "./localStorage";
import {
  getUserDataApi,
  refreshAccessTokenApi,
  revokeRefreshTokenApi,
  signInApi
} from "./authApi";
import delay from "../util/delay";

let authStore = {
  accessToken: undefined,
  refreshToken: undefined,
  userData: undefined
};

window.__APP_DEBUG__ = window.__APP_DEBUG__ || {};
window.__APP_DEBUG__.authStore = authStore;

function updateAccessToken(accessToken) {
  storeAccessTokenInCache(accessToken);
  authStore.accessToken = accessToken;
}

function updateRefreshToken(refreshToken) {
  storeRefreshTokenInCache(refreshToken);
  authStore.refreshToken = refreshToken;
}

function updateUserData(userData) {
  storeUserDataInCache(userData);
  authStore.userData = userData;
}

export function getAccessToken() {
  return authStore.accessToken;
}

function getRefreshToken() {
  return authStore.refreshToken;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param username
 * @param password
 * @return {Promise<void>}
 * @throws {Error} NO_TOKEN, NO_SERVER, NO_USER_DATA
 */
export async function signIn({ username, password }) {
  let { accessToken, refreshToken, servers } = await signInApi({
    username,
    password
  });

  if (!accessToken || !refreshToken) {
    throw new Error("NO_TOKEN");
  }

  updateAccessToken(accessToken);
  updateRefreshToken(refreshToken);

  await getUserData(username);
}

async function getUserData(username) {
  // fetch user data as a part of sign in flow, because there is nothing to show
  // in the app without user data.
  let [userData] = await Promise.all([
    getUserDataApi(username)
    // ... some other data from other APIs
  ]);

  if (!userData) {
    throw new Error("NO_USER_DATA");
  }

  updateUserData(userData);
}

export function immediateSignIn({ accessToken, refreshToken, userData }) {
  updateAccessToken(accessToken);
  updateRefreshToken(refreshToken);
  updateUserData(userData);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @return {Promise<void>}
 */
async function signOut() {
  clearAllFromCache();

  // fire and forget, we don't care if it was successfully done or not.
  // it could fail if refresh token is expired!!!
  revokeRefreshTokenApi(authStore.refreshToken).catch(e => {
    // eslint-disable-next-line
    console.warn("Failed to revoke token", e);
  });
  // give it half a second to complete or go reload the page
  // (reload will cancel request)
  await delay(500);

  window.location.reload();
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let accessTokenRefreshPromise;

export async function callApiWithRefresh(requestData) {
  if (accessTokenRefreshPromise) {
    // wait for refresh to complete and retry operation
    await accessTokenRefreshPromise;
    accessTokenRefreshPromise = undefined;
    return callApiWithRefresh(requestData);
  }

  try {
    return await callApi(requestData);
  } catch (e) {
    if (e.invalidToken) {
      // could get here multiple times when parallel requests are triggered
      if (!accessTokenRefreshPromise) {
        accessTokenRefreshPromise = getNewAccessToken();
      }
      // don't await promise here, just call callApiWithRefresh again!
      return callApiWithRefresh(requestData);
    } else {
      throw e;
    }
  }
}

async function getNewAccessToken() {
  try {
    const { accessToken: newAccessToken } = await refreshAccessTokenApi(
      getRefreshToken()
    );
    updateAccessToken(newAccessToken);
  } catch (e) {
    // failed to refresh access token
    await signOut();
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export function isAuthenticated() {
  return !!(getUserData() && getAccessToken());
}
