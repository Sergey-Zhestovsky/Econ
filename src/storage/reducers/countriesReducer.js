
let init = {
  countries: [],
  error: null
};

export default function countryReducer(state = init, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.result
      }

    case "ERROR_COUNTRIES":
      return {
        ...state,
        error: action.error
      }

    case "CLEAR_COUNTRIES":
      return init;

    default:
      break;
  }

  return state;
}