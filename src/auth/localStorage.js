const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: '__ezadmin__access_token__',
  REFRESH_TOKEN: '__ezadmin__refresh_token__',
  USER_DATA: '__ezadmin__user_data__',
  SERVERS_DATA: '__ezadmin__servers_data__',
};

export function storeAccessTokenInCache(token) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
}

export function storeRefreshTokenInCache(token) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, token);
}

export function getAccessTokenFromCache() {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
}

export function getRefreshTokenFromCache() {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
}

export function clearTokenFromCache() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
}

export function storeUserDataInCache(userData) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
}

export function clearUserDataFromCache() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
}

export function getUserDataFromCache() {
  let userDataJson = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
  if (!userDataJson) return undefined;
  return JSON.parse(userDataJson);
}

export function clearAllFromCache() {
  clearTokenFromCache();
  clearUserDataFromCache();
}
