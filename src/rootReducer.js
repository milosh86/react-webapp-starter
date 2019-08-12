import { combineReducers } from "redux";
import someProtectedResourceReducer from "./pages/SomeProtectedPage/someProtectedPageReducer";

const rootReducer = combineReducers({
  someProtectedResourceReducer
});

export default rootReducer;
