import { combineReducers } from "redux";
import agents from "./agents";

const createRootReducer = () =>
  combineReducers({
    agents,
  });

export default createRootReducer;
