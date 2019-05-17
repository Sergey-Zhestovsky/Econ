import { template } from "@babel/core";

let init = {
  goods: [],
  error: null,
  loading: false
};

function findAndReplace(array, element, eqProperty) {
  let index = array.findIndex(el => el[eqProperty] === element[eqProperty]),
    temp = [...array];

  temp[index] = element;
  return temp;
}

function findAndDelete(array, element, eqProperty) {
  let index = array.findIndex(el => el[eqProperty] === element[eqProperty]),
    temp = [...array];

  temp.splice(index, 1);

  return temp;
}

export default function goodsReducer(state = init, action) {
  switch (action.type) {
    case "CREATE_GOODS":
      return {
        ...state,
        goods: [...state.goods, action.result],
        loading: false,
        error: null
      };

    case "GET_GOODS":
      return {
        ...state,
        goods: action.result,
      };

    case "EDIT_GOODS":
      return {
        ...state,
        goods: findAndReplace(state.goods, action.result, "_id"),
        loading: false
      };

    case "DELETE_GOODS":
      return {
        ...state,
        goods: findAndDelete(state.goods, action.result, "_id"),
        loading: false
      };

    case "LOADING_GOODS":
      return {
        ...state,
        loading: true
      };

    case "ERROR_GOODS":
      return {
        ...state,
        error: action.error
      };

    case "CLEAR_GOODS":
      return init;

    default:
      break;
  }

  return state;
}