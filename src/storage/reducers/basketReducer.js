const LOCAL_VARIABLE = "basket";
let init = {
  productrs: []
},
  initWithData = {...init, productrs: getProducts()};

function getProducts() {
  return JSON.parse(localStorage.getItem(LOCAL_VARIABLE)) || [];
}

function setProducts(array) {
  localStorage.setItem(LOCAL_VARIABLE, JSON.stringify(array));

  return array;
}

function setProduct(product) {
  let currentArr = getProducts();
  
  currentArr.push(product);
  setProducts(currentArr);

  return currentArr;
}

function removeProduct(product) {
  let currentArr = getProducts(),
    index = currentArr.findIndex(el => el._id == product._id);

  currentArr.splice(index, 1);
  setProducts(currentArr);

  return currentArr;
}

export default function basketReducer(state = initWithData, action) {
  switch (action.type) {
    case "GET_BASKET":
      return {
        ...state,
        productrs: getProducts()
      }

    case "SET_BASKET":
      return {
        ...state,
        productrs: setProduct(action.product)
      }

    case "REMOVE_BASKET":
      return {
        ...state,
        productrs: removeProduct(action.product)
      }

    case "CLEAR_BASKET":
      return {
        ...state,
        productrs: setProducts([])
      };

    default:
      break;
  }

  return state;
}