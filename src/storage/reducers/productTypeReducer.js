
let init = {
  types: [],
  error: null
};

export default function productTypeReducer(state = init, action) {
  switch (action.type) {
    case "GET_TYPES":
      return {
        ...state,
        types: action.result
      }

    case "ERROR_TYPES":
      return {
        ...state,
        error: action.error
      }

    case "CLEAR_TYPES":
      return init;

    default:
      break;
  }

  return state;
}