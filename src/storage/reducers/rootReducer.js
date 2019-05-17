import goods from "./goodsReducer";
import countries from "./countriesReducer";
import productTypes from "./productTypeReducer";
import auth from "./authReducer";
import basket from "./basketReducer";
import { combineReducers } from "redux";

let rootReducer = combineReducers({
  goods,
  countries,
  productTypes,
  auth,
  basket
});

export default rootReducer;