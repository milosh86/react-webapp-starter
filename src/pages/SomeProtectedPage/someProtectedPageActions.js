import {
  RESOURCE_FETCH_FAILURE,
  RESOURCE_FETCH_REQUEST,
  RESOURCE_FETCH_SUCCESS
} from "./someProtectedPageReducer";
import { someResourceApi } from "./someProtectedPageApi";

export function resourceFetchRequest(resourceId) {
  return dispatch => {
    dispatch({ type: RESOURCE_FETCH_REQUEST });

    someResourceApi(resourceId)
      .then(resource => {
        dispatch({ type: RESOURCE_FETCH_SUCCESS, someResource: resource });
      })
      .catch(err => {
        dispatch({ type: RESOURCE_FETCH_FAILURE });
      });
  };
}
