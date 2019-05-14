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
  goods: [TEMP, TEMP, TEMP],
  error: null
};

export default function projectReducer(state = init, action) {
  switch (action.type) {
    case "GET_GOODS":
      return {
        ...state,
      }

    case "CLEAR_GOODS":
      return init;

    default:
      break;
  }

  return state;
}