import immerProduce from "immer";

export const RESOURCE_FETCH_REQUEST =
  "someProtectedPage/RESOURCE_FETCH_REQUEST";
export const RESOURCE_FETCH_SUCCESS =
  "someProtectedPage/RESOURCE_FETCH_SUCCESS";
export const RESOURCE_FETCH_FAILURE =
  "someProtectedPage/RESOURCE_FETCH_FAILURE";

const initialState = {
  someResource: undefined,
  isResourceFetchInProgress: false,
  isResourceFetchFailed: false
};

const someProtectedResourceReducer = immerProduce((draft, action) => {
  switch (action.type) {
    case RESOURCE_FETCH_REQUEST:
      draft.isResourceFetchInProgress = true;
      draft.isResourceFetchFailed = false;
      draft.someResource = undefined;
      break;
    case RESOURCE_FETCH_SUCCESS:
      draft.isResourceFetchInProgress = false;
      draft.someResource = action.someResource;
      break;
    case RESOURCE_FETCH_FAILURE:
      draft.isResourceFetchInProgress = false;
      draft.isResourceFetchFailed = true;
      break;
    default:
      return draft;
  }
}, initialState);

const someProtectedResourceReducerStandard = (state = initialState, action) => {
  switch (action.type) {
    case RESOURCE_FETCH_REQUEST:
      return {
        isResourceFetchInProgress: true,
        isResourceFetchFailed: false,
        someResource: undefined
      };

    case RESOURCE_FETCH_SUCCESS:
      return {
        isResourceFetchInProgress: true,
        isResourceFetchFailed: false,
        someResource: action.someResource
      };
    case RESOURCE_FETCH_FAILURE:
      return {
        isResourceFetchInProgress: false,
        isResourceFetchFailed: true,
        someResource: undefined
      };
  }
};
export default someProtectedResourceReducer;
