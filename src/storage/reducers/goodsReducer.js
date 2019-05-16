import { template } from "@babel/core";

const TEMP = {
  _id: 49763468349867,
  name: "temp name",
  productType: {
    _id: 123,
    name: "product type name"
  },
  company: "company",
  country: {
    _id: 123,
    name: "country Name"
  },
  price: 123,
  discount: null,
  image: "/img/goods/123.jpg",
  storage: {
    img: "/img/storages/123.jpg"
  },
  location: {
    x: 12,
    y: 72
  },
  addCounter: 123,
  rating: 412,
  date: 16902369
};

let init = {
  goods: [
    { ...TEMP, _id: 1 }, { ...TEMP, _id: 2 }, { ...TEMP, _id: 3 }
  ],
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