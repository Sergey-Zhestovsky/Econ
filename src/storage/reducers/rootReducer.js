import goods from "./goodsReducer";
import { combineReducers } from "redux";

let rootReducer = combineReducers({
  goods
});

export default rootReducer;