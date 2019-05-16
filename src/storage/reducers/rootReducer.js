import goods from "./goodsReducer";
import countries from "./countriesReducer";
import productTypes from "./productTypeReducer";
import { combineReducers } from "redux";

let rootReducer = combineReducers({
  goods,
  countries,
  productTypes
});

export default rootReducer;