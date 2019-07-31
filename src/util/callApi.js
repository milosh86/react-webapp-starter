import env from "../config/env";
import { getAccessToken } from "../auth/auth";

const AUTH_URL = env.authServer + "/api";
const APP_URL = env.appServer + "/api";
export const URL_ENCODED_TYPE = "application/x-www-form-urlencoded";
export const JSON_TYPE = "application/json";
export const MULTIPART_TYPE = "multipart/form-data";

if (!env.appServer || !env.authServer) {
  throw new Error("Invalid config file! Check config.js and config/env.js...");
}

/**
 *
 * @param url
 * @param isAuth - whether to send a request to API or AUTH server
 * @param method
 * @param body
 * @param headers
 * @param externalToken
 * @param noContentType
 * @param isMultipart - If "multipart/form-data" is sent, "content-type" must not
 * be set. It should be set by the browser automatically with correct boundary!!!
 */
export default function callApi({
  url,
  isAuth = false,
  method,
  body,
  headers = {},
  externalToken,
  isMultipart = false,
  noContentType = false
}) {
  if (!method) {
    throw new Error(
      `${url}: method is required! Probably wanted to send 'GET'`
    );
  }

  let token = externalToken || getAccessToken();

  let defaultHeaders = {
    Accept: JSON_TYPE,
    "content-type": JSON_TYPE
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  headers = Object.assign({}, defaultHeaders, headers);

  if (isMultipart || noContentType) {
    delete headers["content-type"];
    delete headers["Content-Type"];
  }

  const BASE_URL = isAuth ? AUTH_URL : APP_URL;

  return fetch(`${BASE_URL}/${url}`, {
    headers,
    method,
    mode: "cors",
    body: prepareBody(
      isMultipart ? MULTIPART_TYPE : headers["content-type"],
      body
    )
  })
    .then(response => {
      let contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("image")) {
        return response.blob().then(blob => ({
          data: URL.createObjectURL(blob),
          response
        }));
      } else if (contentType && contentType.includes("pdf")) {
        return response.blob().then(blob => ({
          data: blob,
          response
        }));
      } else if (contentType && contentType.includes("zip")) {
        return response.blob().then(blob => ({
          data: blob,
          response
        }));
      } else {
        // try JSON and fallback to text if json fails
        return response
          .clone()
          .json()
          .then(json => ({ data: json, response }))
          .catch(() =>
            response.text().then(text => ({ data: text, response }))
          );
      }
    })
    .then(({ data, response }) => {
      if (response.status === 401) {
        // token is either invalid or expired
        return Promise.reject({ invalidToken: true, data });
      }

      if (response.status === 403) {
        // eslint-disable-next-line
        console.warn(`"${url}" request failed with 403 - not authorized...`);
        return Promise.reject({ unauthorized: true });
      }

      return data;
    });
}

export function objToUrlEncoded(obj) {
  if (!obj) return;

  return Object.keys(obj)
    .map(key => {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(obj[key]);
      return encodedKey + "=" + encodedValue;
    })
    .join("&");
}

function makeMultipartData(obj) {
  let formData = new FormData();
  for (let name in obj) {
    formData.append(name, obj[name]);
  }

  return formData;
}

function prepareBody(contentType, body) {
  switch (contentType) {
    case URL_ENCODED_TYPE:
      return objToUrlEncoded(body);
    case JSON_TYPE:
      return JSON.stringify(body);
    case MULTIPART_TYPE:
      return makeMultipartData(body);
    default:
      return body;
  }
}
