import { combineReducers } from "redux";
import formsReducer from "./formsReducers";
import globalReducer from "./globalReducers";

export const rootReducer = combineReducers({
  globalReducer,
  formsReducer,
});
